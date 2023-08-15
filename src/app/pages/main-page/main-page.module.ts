import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { MainPageRoutingModule } from './main-page-routing.module';



@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, SharedComponentsModule, MainPageRoutingModule],
})

export class MainPageModule {}
