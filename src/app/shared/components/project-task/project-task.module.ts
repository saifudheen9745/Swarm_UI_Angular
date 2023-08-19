import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTaskComponent } from './project-task.component';
import { RouterModule, Routes } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProjectOverviewComponent } from '../project-overview/project-overview.component';
import { TasksComponent } from '../tasks/tasks.component';
import { SharedComponentsModule } from '../shared-components.module';
import { TaskListComponent } from '../task-list/task-list.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { FilterPipe } from '../../pipes/filter.pipe';
import { TaskViewComponent } from '../task-view/task-view.component';
import { TaskCommentComponent } from '../task-comment/task-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const route: Routes = [{ path: '', component: ProjectTaskComponent }];

@NgModule({
  declarations: [
    ProjectTaskComponent,
    ProjectOverviewComponent,
    TasksComponent,
    TaskListComponent,
    CreateTaskComponent,
    TaskViewComponent,
    FilterPipe,
    TaskCommentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    NgCircleProgressModule,
    SharedComponentsModule,
    ReactiveFormsModule
  ],
})
export class ProjectTaskModule {}
