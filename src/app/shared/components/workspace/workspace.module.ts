import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { SelectWorkspaceComponent } from '../select-workspace/select-workspace.component';
import { WorkspaceDetailsComponent } from '../workspace-details/workspace-details.component';
import { WorkspaceListingComponent } from '../workspace-listing/workspace-listing.component';
import { WorkspaceDataListingComponent } from '../workspace-data-listing/workspace-data-listing.component';
import { SharedComponentsModule } from '../shared-components.module';
import { FormsModule } from '@angular/forms';

const route:Routes = [{path:'',component:WorkspaceComponent}]

@NgModule({
  declarations: [SelectWorkspaceComponent,WorkspaceComponent,WorkspaceDetailsComponent,WorkspaceListingComponent,WorkspaceDataListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedComponentsModule,
    FormsModule
  ],
})
export class WorkspaceModule { }
