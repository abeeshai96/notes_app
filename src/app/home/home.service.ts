import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  notesChanged = new Subject<Note[]>();
  private notes: Note[] = [];

  constructor() {}

  setNotes(notes: Note[]) {
    this.notes = notes.filter(this.notEmpty);
    this.notesChanged.next(this.notes.slice());
  }

  notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  getNotes() {
    return this.notes.slice();
  }

  getNote(index: number) {
    return this.notes[index];
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.notesChanged.next(this.notes.slice());
  }

  updateNote(index: number, newNote: Note) {
    this.notes[index] = newNote;
    this.notesChanged.next(this.notes.slice());
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.notesChanged.next(this.notes.slice());
  }
}
