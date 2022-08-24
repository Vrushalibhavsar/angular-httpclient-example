import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddComponent } from './users/add/add.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

const routes: Routes = [ { path: '', redirectTo: 'home', pathMatch: 'full'},
{ path: 'how-it-works', component: HowItWorksComponent },
{ path: 'users', component: UsersComponent },
{ path: 'users/add', component: AddComponent },
{ path: 'users/add/:id', component: AddComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
