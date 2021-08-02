import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RowComponent } from './table/row/row.component';

import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component'



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'showUsers', component: TableComponent },
  { path: 'addUser', component: AddComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    RowComponent,
    HomeComponent,
    AddComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
     RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
