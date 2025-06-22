import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home/home-page.component';
import { DisplayPageComponent } from './display-page/display-page.component';

const routes: Routes = [
  
  { path: 'home-page', component: HomePageComponent },
  { path: 'display', component: DisplayPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
