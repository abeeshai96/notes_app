import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HomeService } from '../home.service';
import { Note } from '../note.model';

@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.css'],
})
export class NotesDetailComponent implements OnInit {
  modalRef: BsModalRef;
  note: Note;
  id: number;

  constructor(
    private modalService: BsModalService,
    private homeService: HomeService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
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

  onConfirmBox(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onDeleteNote() {
    this.modalRef.hide();
    this.homeService.deleteNote(this.id);
    this.dataStorageService.deleteNote(this.id);
    this.toastr.error('Deleted the note successfully!');
    this.router.navigate(['/notes']);
  }
}
