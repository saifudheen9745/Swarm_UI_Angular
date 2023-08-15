import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideNavbarComponent } from './aside-navbar/aside-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserAccountComponent } from './user-account/user-account.component';
import { FormsModule } from '@angular/forms';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { WpFormComponent } from './wp-form/wp-form.component';
import { NgxColorsModule } from 'ngx-colors';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { EmailCollectorComponent } from './email-collector/email-collector.component';
import { CreateWorkspaceComponent } from './create-workspace/create-workspace.component';




@NgModule({
  declarations: [NavbarComponent, AsideNavbarComponent, UserAccountComponent, HomeComponentComponent, HomeCardComponent, WpFormComponent, CustomModalComponent,EmailCollectorComponent, CreateWorkspaceComponent],
  imports: [CommonModule, FontAwesomeModule,FormsModule,NgxColorsModule],
  exports: [NavbarComponent, AsideNavbarComponent, UserAccountComponent, HomeComponentComponent, HomeCardComponent,WpFormComponent,CustomModalComponent,EmailCollectorComponent,CreateWorkspaceComponent]
})
export class SharedComponentsModule {}
