import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideNavbarComponent } from './aside-navbar/aside-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [NavbarComponent,AsideNavbarComponent],
  exports:[NavbarComponent,AsideNavbarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class SharedComponentsModule { }
