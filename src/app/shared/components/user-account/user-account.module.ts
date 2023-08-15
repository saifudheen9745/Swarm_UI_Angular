import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { UserAccountComponent } from './user-account.component';
import { FormsModule } from '@angular/forms';

const route:Routes = [
  {path:'',component:UserAccountComponent}
]

@NgModule({
  declarations: [UserAccountComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class UserAccountModule { }
