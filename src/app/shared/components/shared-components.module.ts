import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideNavbarComponent } from './aside-navbar/aside-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserAccountComponent } from './user-account/user-account.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavbarComponent, AsideNavbarComponent, UserAccountComponent],
  imports: [CommonModule, FontAwesomeModule,FormsModule],
  exports: [NavbarComponent, AsideNavbarComponent, UserAccountComponent],
})
export class SharedComponentsModule {}
