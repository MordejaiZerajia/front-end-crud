import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// for work with reactive forms
import { ReactiveFormsModule } from '@angular/forms';
// for work with http request
import { HttpClientModule } from '@angular/common/http';
// for work with material tables
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
// for work with forms controllers
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // needed to work with Datepicker
import { MomentDateModule } from '@angular/material-moment-adapter';
// for work with alerts
import { MatSnackBarModule } from '@angular/material/snack-bar';
// for work with material icons
import { MatIconModule } from '@angular/material/icon';
// for work with modal screen
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogDeleteComponent } from './Modals/dialog-delete/dialog-delete.component';
import { DialogAddEditComponent } from './Modals/dialog-add-edit/dialog-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogDeleteComponent,
    DialogAddEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule, 
    MatDialogModule,
    MatGridListModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
