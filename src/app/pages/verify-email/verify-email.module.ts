import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { VerifyEmailComponent } from './verify-email.component';

const route:Routes = [
  {path:'',component:VerifyEmailComponent}
]

@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class VerifyEmailModule { }
