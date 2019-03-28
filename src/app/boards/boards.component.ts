import { Component, OnInit } from '@angular/core';
import { BoardsService } from './boards.service';
import { Observable } from 'rxjs/internal/Observable';
import { BoardInterface } from './board.interface';

@Component({
  selector: 'note-boards',
  template: `
    <mat-nav-list>
      <a mat-list-item *ngFor="let board of boards | async" [routerLink]="[board.id]">{{ board.name }}</a>
    </mat-nav-list>
  `,
  styles: []
})
export class BoardsComponent implements OnInit {
  boards: Observable<BoardInterface[]>;

  constructor(private boardsService: BoardsService) { }

  ngOnInit() {
    this.boards = this.boardsService.getState();
  }
}
