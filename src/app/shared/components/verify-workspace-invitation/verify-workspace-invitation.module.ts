import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VerifyWorkspaceInvitationComponent } from './verify-workspace-invitation.component';

const route:Routes =[{path:'',component:VerifyWorkspaceInvitationComponent}]

@NgModule({
  declarations: [VerifyWorkspaceInvitationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class VerifyWorkspaceInvitationModule { }
