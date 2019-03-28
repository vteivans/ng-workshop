import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'note-note-form',
  template: `
    <form (submit)="__close($event)">
      <mat-form-field appearance="outline">
        <mat-label>Enter a Note</mat-label>
        <textarea matInput mat-autosize [value]="data.value" placeholder="Placeholder"></textarea>
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
export class NoteFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NoteFormComponent>) {
  }

  ngOnInit() {
  }

  __close(event) {
    event.preventDefault();
    this.dialogRef.close('done');
  }
}
