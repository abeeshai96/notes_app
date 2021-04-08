import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { HomeService } from '../home/home.service';
import { Note } from '../home/note.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private homeService: HomeService) {}

  storeNotes() {
    const notes = this.homeService.getNotes();
    this.http
      .put(
        'https://notes-app-angular-poc-default-rtdb.firebaseio.com/notes.json',
        notes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  deleteNote(id: number) {
    this.http
      .delete(
        `https://notes-app-angular-poc-default-rtdb.firebaseio.com/notes/${id}.json`
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchNotes() {
    return this.http
      .get<Note[]>(
        'https://notes-app-angular-poc-default-rtdb.firebaseio.com/notes.json'
      )
      .pipe(
        tap((notes) => {
          this.homeService.setNotes(notes);
        })
      );
  }
}
