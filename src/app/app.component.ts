import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteFormComponent } from './note-form/note-form.component';
import { Observable } from 'rxjs';
import { BoardInterface } from './boards/board.interface';
import { ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';
import { NotesService } from './notes/notes.service';
import { BoardsService } from './boards/boards.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'note-root',
  template: `
    <main>
    <h1 class="mat-h1">Notes</h1>
    <mat-card>
      <div class="sidebar">
        <form (submit)="createNote($event, text)">
          <mat-form-field appearance="outline">
            <mat-label>Enter a Note</mat-label>
            <textarea #text matInput mat-autosize placeholder="Placeholder"></textarea>
            <mat-hint>Enter some text</mat-hint>
          </mat-form-field>
          <br>
          <button mat-raised-button color="primary">Create</button>
        </form>
        <br>
        <mat-divider [inset]="true"></mat-divider>
        <note-boards></note-boards>
      </div>

      <section>
        <router-outlet></router-outlet>
      </section>

    </mat-card>
    <main>
  `,
  styles: [`
    main {
      margin-left: auto;
      margin-right: auto;
      max-width: 1024px;
    }
    mat-card {
      display: flex;
      flex-direction: row;
      align-items: stretch;
    }
    .sidebar {
      width: 300px;
      opacity: .6;
      flex-shrink: 0;
      margin-right: 20px;
    }
    section {
      opacity: .6;
      width: 100%;
      flex-grow: 1;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    form mat-form-field {
      width: 100%;
    }

    .add-button {
      width: 100%;
    }
  `]
})
export class AppComponent {
  title = 'note-app';

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private notesService: NotesService,
    private boardsService: BoardsService,
    private http: HttpClient) {
  }

  createNote(event, input) {
    event.preventDefault();
    if (!input.value) {
      return;
    }
    const boardId = this.service.getCurrentBoard();

    if (boardId) {
      this.notesService.createItem({text: input.value, boardId}).subscribe(note => {
        input.value = '';
      });
      return;
    }

    this.boardsService.getState().pipe(
      switchMap(boards => {
        return this.notesService.createItem({text: input.value, boardId: boards[0].id});
      })
    ).subscribe(note => {
      input.value = '';
    });
  }
}
