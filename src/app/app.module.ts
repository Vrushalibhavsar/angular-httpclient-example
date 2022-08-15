import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/Icon';
import {  MatCardModule} from '@angular/material/Card'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { NavComponent } from './nav/nav.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddComponent } from './products/add/add.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



// import { MatPaginatorModule } from '@angular/material';
// import {MatPaginator} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavComponent,
    ProductsComponent,
    AddComponent,
    ConfirmDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    
    // MatTableDataSource,
    
    // MatPaginator,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
