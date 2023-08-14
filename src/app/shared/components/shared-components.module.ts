import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideNavbarComponent } from './aside-navbar/aside-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserAccountComponent } from './user-account/user-account.component';
import { FormsModule } from '@angular/forms';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HomeCardComponent } from './home-card/home-card.component';



@NgModule({
  declarations: [NavbarComponent, AsideNavbarComponent, UserAccountComponent, HomeComponentComponent, HomeCardComponent],
  imports: [CommonModule, FontAwesomeModule,FormsModule],
  exports: [NavbarComponent, AsideNavbarComponent, UserAccountComponent, HomeComponentComponent, HomeCardComponent],
})
export class SharedComponentsModule {}
