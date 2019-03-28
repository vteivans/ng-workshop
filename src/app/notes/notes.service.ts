import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NoteInterface } from './note.interface';
import { switchMap, take, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  state = new BehaviorSubject<NoteInterface[]>([]);
  private init = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getState(id?: string|number) {
    this.init.pipe(
      take(1),
      filter(val => val === false),
      switchMap(() => this.http.get<NoteInterface[]>('/api/notes'))
    ).subscribe(notes => {
      this.init.next(true);
      this.state.next(notes);
    });
    return this.state;
  }

  createItem(note: Partial<NoteInterface>) {
    return this.init.pipe(
      take(1),
      switchMap(() => this.http.post<NoteInterface>('/api/notes', note)),
      tap(newNote => {
        const existingNotes = this.state.getValue();
        this.state.next([...existingNotes, newNote]);
      })
    );
  }

  updateItem(note: Partial<NoteInterface>) {
    return this.init.pipe(
      take(1),
      switchMap(() => this.http.put<NoteInterface>(`/api/notes/${note.id}`, note)),
      tap(updatedNote => {
        const existingNotes = this.state.getValue();
        this.state.next(existingNotes.map(existingNote => {
          if (+existingNote.id === +updatedNote.id) {
            return updatedNote;
          }
          return existingNote;
        }));
      })
    );
  }

  deleteItem(id) {
    return this.init.pipe(
      take(1),
      switchMap(() => this.http.delete<NoteInterface>(`/api/notes/${id}`)),
      tap(deletedNote => {
        const existingNotes = this.state.getValue();
        this.state.next(existingNotes.filter(existingNote => +existingNote.id !== +deletedNote.id));
      })
    );
  }
}
