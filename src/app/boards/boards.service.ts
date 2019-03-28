import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardInterface } from './board.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  state = new BehaviorSubject<BoardInterface[]>([
    {
      id: 1,
      name: 'Quick notes'
    },
    {
      id: 2,
      name: 'Other'
    }
  ]);

  constructor() { }

  getState() {
    return this.state;
  }
}
