import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WpFormComponent } from './wp-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from '../shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const route:Routes =[
  {path:'',component:WpFormComponent}
]

@NgModule({
  declarations: [WpFormComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(route),
    SharedComponentsModule,
    ReactiveFormsModule
  ]
})
export class WpFormModule { }
