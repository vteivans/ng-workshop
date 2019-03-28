import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService implements CanActivate {
  currentBoard: null|number = null;

  constructor() { }

  getCurrentBoard() {
    return this.currentBoard;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ('id' in route.params) {
      this.currentBoard = +route.params.id;
    }
    return true;
  }
}
