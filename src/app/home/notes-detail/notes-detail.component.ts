import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HomeService } from '../home.service';
import { Note } from '../note.model';

@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.css'],
})
export class NotesDetailComponent implements OnInit {
  note: Note;
  id: number;

  constructor(
    private homeService: HomeService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.note = this.homeService.getNote(this.id);
    });
  }

  onEditNote() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteNote() {
    this.homeService.deleteNote(this.id);
    this.dataStorageService.deleteNote(this.id);
    this.router.navigate(['/notes']);
  }
}
