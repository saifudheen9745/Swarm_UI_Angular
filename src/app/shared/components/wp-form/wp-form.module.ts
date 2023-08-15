import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WpFormComponent } from './wp-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from '../shared-components.module';

const route:Routes =[
  {path:'',component:WpFormComponent}
]

@NgModule({
  declarations: [WpFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedComponentsModule,
  ]
})
export class WpFormModule { }
