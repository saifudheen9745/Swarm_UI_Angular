import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

const route:Routes = [
  {path:'',component:HomePageComponent}
]

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, RouterModule.forChild(route),SharedComponentsModule],
})
export class HomePageModule {}
