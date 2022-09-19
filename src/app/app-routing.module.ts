import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { AddComponent } from './products/add/add.component';



const routes: Routes = [ { path: '', redirectTo: 'home', pathMatch: 'full'},
{ path: 'home', component: HomeComponent },
{ path: 'about', component: AboutComponent },
{ path: 'products', component: ProductsComponent },
{ path: 'products/add', component: AddComponent },
{ path: 'products/add/:id', component: AddComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
