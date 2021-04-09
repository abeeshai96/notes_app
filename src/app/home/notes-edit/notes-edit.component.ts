import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  note: Note;
  editMode = false;
  formEditFlag = false;

  @ViewChild('f', { static: false }) notesForm: NgForm;
  defaultType = 'personal';
  defaultPriority = 'medium';
  types = ['personal', 'office', 'misc'];
  priorities = ['low', 'medium', 'high'];
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private homeService: HomeService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.note = this.homeService.getNote(this.id);
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
      if (this.formChanged()) {
        this.formEditFlag = false;
        this.homeService.updateNote(this.id, newNote);
        this.toastr.info('Updated the note successfully!');
        this.dataStorageService.storeNotes();
        this.onCancel();
      } else {
        this.formEditFlag = true;
      }
    } else {
      this.homeService.addNote(newNote);
      this.toastr.success('Added the note successfully!');
      this.dataStorageService.storeNotes();
      this.onCancel();
    }
  }

  onCancel() {
    this.notesForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  initForm() {
    if (this.editMode) {
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

  formChanged() {
    if (
      this.note.title === this.notesForm.form.value.title &&
      this.note.description === this.notesForm.form.value.description &&
      this.note.date === this.notesForm.form.value.date &&
      this.note.type === this.notesForm.form.value.type &&
      this.note.priority === this.notesForm.form.value.priority
    ) {
      return false;
    } else {
      return true;
    }
  }
}
