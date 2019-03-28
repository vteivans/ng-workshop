import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NoteInterface } from './note.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  state = new BehaviorSubject<NoteInterface[]>([
    {
      id: 1,
      boardId: 1,
      text: 'Some text'
    },
    {
      id: 2,
      boardId: 1,
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
    },
    {
      id: 3,
      boardId: 2,
      text: 'Hello from the second board'
    }
  ]);

  constructor(private http: HttpClient) { }

  getState(id?: string|number) {
    return this.state;
    // if (id) {
    //   return this.http.get(`/api/notes/${id}`);
    // }
    // return this.http.get('/api/notes');
  }

  createItem(note) {
    return this.http.post('/api/notes', note);
  }

  updateItem(note) {
    return this.http.put(`/api/notes/${note.id}`, note);
  }

  deleteItem(id) {
    return this.http.delete(`/api/notes/${id}`);
  }
}
