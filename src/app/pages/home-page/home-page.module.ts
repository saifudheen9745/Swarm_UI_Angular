import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';

const route:Routes = [
  {path:'',component:HomePageComponent}
]

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class HomePageModule { }
