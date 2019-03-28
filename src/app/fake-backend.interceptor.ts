import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { merge } from 'lodash';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /*
    1. POST = push to collection
    2. GET = get what ever is at the path
    3. PATCH = update object deep
    4. DELETE = delete at the path
    */

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {
      const url = request.url.replace(/^https?:\/\/([A-z0-9_:\-\.])+\//, '/');

      if (url.startsWith('/api')) {
        const [prefix, collection, id] = url.substr(1).split('/');
        const key = `note-app-${collection}`;

        console.log(prefix, collection, id);
        // return of(new HttpResponse({ status: 200, body: [1, 2, 3] }));
        let data;

        switch (request.method) {
          case 'GET':
            data = this.getData(key, id);
            break;
          case 'POST':
            data = this.addData(key, request.body);
            break;
          case 'PUT':
            data = this.updateData(key, id, request.body);
            break;
          case 'DELETE':
            data = this.deleteData(key, id);
            break;
        }

        if (data === null) {
          return of(new HttpResponse({ status: 404, body: { message: 'item not found' }}));
        }

        return of(new HttpResponse({ status: 200, body: data }));
      }

      return next.handle(request);
    }))

    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
    .pipe(
      materialize(),
      delay(500),
      dematerialize()
    );
  }

  addData(key: string, data) {
    const collection: any[] = JSON.parse(localStorage.getItem(key)) || [];
    const id = collection.reduce((maxId, item) => {
      return Math.max(parseInt(item.id, 10), maxId);
    }, 0);

    const newItem = {...data, id: id + 1};

    collection.push(newItem);
    localStorage.setItem(key, JSON.stringify(collection));

    return newItem;
  }

  updateData(key: string, id, data) {
    const collection: any[] = JSON.parse(localStorage.getItem(key)) || [];
    const itemToUpdate = collection.find(item => parseInt(item.id, 10) === parseInt(id, 10));
    if (!itemToUpdate) {
      return null;
    }

    const updatedItem = merge({}, itemToUpdate, {...data, id});

    localStorage.setItem(key, JSON.stringify(collection.map(item => {
      if (item === itemToUpdate) {
        return updatedItem;
      }
      return item;
    })));

    return updatedItem;
  }

  deleteData(key: string, id) {
    const collection: any[] = JSON.parse(localStorage.getItem(key)) || [];
    const itemToDelete = collection.find(item => parseInt(item.id, 10) === parseInt(id, 10));
    if (!itemToDelete) {
      return null;
    }
    const updatedCollection: any[] = collection.filter(item => item !== itemToDelete);
    localStorage.setItem(key, JSON.stringify(updatedCollection));

    return itemToDelete;
  }

  getData(key: string, id?) {
    const collection: any[] = JSON.parse(localStorage.getItem(key)) || [];
    if (!id) {
      return collection;
    }
    const item = collection.find(_item => parseInt(_item.id, 10) === parseInt(id, 10));
    if (!item) {
      return null;
    }
    return item;
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
