import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { NoteFormComponent } from './note-form/note-form.component';

@Component({
  selector: 'note-root',
  template: `
    <main>
    <h1 class="mat-h1">Notes</h1>
    <mat-card>
      <div class="sidebar">
        <form action="">
          <mat-form-field appearance="outline">
            <mat-label>Enter a Note</mat-label>
            <textarea matInput mat-autosize placeholder="Placeholder"></textarea>
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
        <h2>first</h2>
        <div class="note-item">
          <p style="width: 100%"> Some text </p>
          <button mat-button (click)="__edit($event, 'Some text')"> Edit </button>
          <mat-divider [inset]="true"></mat-divider>
        </div>
        <div class="note-item">
          <p style="width: 100%"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
          <button mat-button (click)="__edit($event, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.')"> Edit </button>
          <mat-divider [inset]="true"></mat-divider>
        </div>
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
    .note-item {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .add-button {
      width: 100%;
    }
  `]
})
export class AppComponent {
  title = 'note-app';

  constructor(
    public dialog: MatDialog,
    private http: HttpClient) {
  }

  __edit(event, text) {
    this.dialog.open(NoteFormComponent, {
      data: {
        value: text,
      },
      width: '500px'
    });
  }
}
