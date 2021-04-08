import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HomeService } from '../home.service';
import { Note } from '../note.model';

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.css'],
})
export class NotesEditComponent implements OnInit, AfterViewInit {
  id: number;
  editMode = false;
  note: Note;

  @ViewChild('f', { static: false }) notesForm: NgForm;
  defaultType = 'personal';
  defaultPriority = 'medium';
  types = ['personal', 'office', 'misc'];
  priorities = ['low', 'medium', 'high'];
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });
  }

  ngAfterViewInit() {
    this.initForm();
  }

  onSubmit() {
    this.submitted = true;
    const formValue = this.notesForm.value;
    const newNote = new Note(
      formValue.title,
      formValue.description,
      formValue.date,
      formValue.type,
      formValue.priority
    );

    if (this.editMode) {
      this.homeService.updateNote(this.id, newNote);
    } else {
      this.homeService.addNote(newNote);
    }
    this.dataStorageService.storeNotes();
    this.onCancel();
  }

  onCancel() {
    this.notesForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  initForm() {
    if (this.editMode) {
      this.note = this.homeService.getNote(this.id);
      setTimeout(() => {
        this.notesForm.setValue({
          title: this.note.title,
          description: this.note.description,
          date: this.note.date,
          type: this.note.type,
          priority: this.note.priority,
        });
      });
    }
  }
}
