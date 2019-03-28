import { Component, OnInit } from '@angular/core';
import { NoteFormComponent } from '../note-form/note-form.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NoteInterface } from './note.interface';
import { NotesService } from './notes.service';
import { BoardsService } from '../boards/boards.service';
import { BoardInterface } from '../boards/board.interface';

@Component({
  selector: 'note-notes',
  template: `
  <h2>{{ (this.currentBoard | async).name }}</h2>
  <div *ngFor="let note of notes | async" class="note-item">
    <p>{{ note.text }}</p>
    <div>
      <button mat-button (click)="edit(note)"> Edit </button>
      <button mat-button (click)="del(note)" color="warn"> Delete </button>
    </div>
    <mat-divider [inset]="true"></mat-divider>
  </div>
  `,
  styles: [`
    .note-item {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    p {
      width: 100%;
    }
  `]
})
export class NotesComponent implements OnInit {

  notes: Observable<NoteInterface[]>;
  currentBoard: Observable<BoardInterface>;

  constructor(
    public dialog: MatDialog,
    private boardsService: BoardsService,
    private notesService: NotesService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentBoard = this.route.params.pipe(switchMap(params => {
      const id = +params.id;

      return this.boardsService.getState().pipe(map(boards => {
        if (!isNaN(id)) {
          return boards.find(board => board.id === id);
        }
        return boards[0];
      }));
    }));

    this.notes = this.currentBoard.pipe(
      switchMap(board => {
        return this.notesService.getState().pipe(map(notes => {
          return notes.filter(note => +note.boardId === +board.id); })
        );
      })
    );
  }

  edit(note: NoteInterface) {
    this.dialog.open(NoteFormComponent, {
      data: note,
      width: '500px'
    });
  }

  del(note: NoteInterface) {
    this.notesService.deleteItem(note.id).subscribe(deletedNote => {
      console.log('Note deleted!', note);
    });
  }
}
