import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HomeService } from '../home.service';
import { Note } from '../note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit, OnDestroy {
  notes: Note[];
  private notesChangedSub: Subscription;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.notesChangedSub = this.homeService.notesChanged.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      }
    );
    this.notes = this.homeService.getNotes();
  }

  onAddNote() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.notesChangedSub.unsubscribe();
  }
}
