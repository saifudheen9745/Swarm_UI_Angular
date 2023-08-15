import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponentComponent } from './home-component.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from '../shared-components.module';

const route: Routes = [{ path: '', component: HomeComponentComponent }];

@NgModule({
  declarations: [HomeComponentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedComponentsModule
  ],
})

export class HomeComponentModule { }
