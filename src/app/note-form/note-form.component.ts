import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteInterface } from '../notes/note.interface';
import { NotesService } from '../notes/notes.service';

@Component({
  selector: 'note-note-form',
  template: `
    <form (submit)="update($event, input)">
      <mat-form-field appearance="outline">
        <mat-label>Enter a Note</mat-label>
        <textarea #input matInput mat-autosize [value]="data.text" placeholder="Placeholder"></textarea>
        <mat-hint>Enter some text</mat-hint>
      </mat-form-field>
      <br>
      <button mat-raised-button color="primary" type="submit">Update</button>
    </form>
  `,
  styles: [`
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  form mat-form-field {
    width: 100%;
  }
  `]
})
export class NoteFormComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NoteInterface,
    public dialogRef: MatDialogRef<NoteFormComponent>,
    private notesService: NotesService) {
  }

  update(event, input) {
    event.preventDefault();
    this.notesService.updateItem({id: this.data.id, text: input.value}).subscribe(updatedNote => {
      console.log("note updated", updatedNote);
    });
    this.dialogRef.close('done');
  }
}
