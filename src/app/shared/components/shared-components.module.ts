import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideNavbarComponent } from './aside-navbar/aside-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HomeCardComponent } from './home-card/home-card.component';
import { NgxColorsModule } from 'ngx-colors';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { EmailCollectorComponent } from './email-collector/email-collector.component';
import { CreateWorkspaceComponent } from './create-workspace/create-workspace.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [NavbarComponent, AsideNavbarComponent, HomeCardComponent, CustomModalComponent,EmailCollectorComponent, CreateWorkspaceComponent],
  imports: [CommonModule, FontAwesomeModule,FormsModule,NgxColorsModule,RouterModule],
  exports: [NavbarComponent, AsideNavbarComponent, HomeCardComponent,CustomModalComponent,EmailCollectorComponent,CreateWorkspaceComponent,NgxColorsModule]
})
export class SharedComponentsModule {}
