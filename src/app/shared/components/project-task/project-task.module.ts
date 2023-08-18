import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTaskComponent } from './project-task.component';
import { RouterModule, Routes } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProjectOverviewComponent } from '../project-overview/project-overview.component';
import { TasksComponent } from '../tasks/tasks.component';

const route:Routes = [{path:'',component:ProjectTaskComponent}]

@NgModule({
  declarations: [ProjectTaskComponent,ProjectOverviewComponent,TasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    NgCircleProgressModule
  ]
})
export class ProjectTaskModule { }
