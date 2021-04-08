import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSplitModule } from 'angular-split';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotesStartComponent } from './home/notes-start/notes-start.component';
import { NotesListComponent } from './home/notes-list/notes-list.component';
import { NotesEditComponent } from './home/notes-edit/notes-edit.component';
import { NotesDetailComponent } from './home/notes-detail/notes-detail.component';
import { NotesItemComponent } from './home/notes-list/notes-item/notes-item.component';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NotesStartComponent,
    NotesListComponent,
    NotesEditComponent,
    NotesDetailComponent,
    NotesItemComponent,
    AlertComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSplitModule,
    NgScrollbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
