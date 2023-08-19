import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProjectTaskService } from '../project-task/project-task.service';
import { task } from 'src/app/config/config.types';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnDestroy {
  @Input() projectId: string;
  userId: string;
  projectTasks: task[];
  selectedTask: task;
  getProjectTaskSubscription: Subscription;
  storeSubscription: Subscription;
  getDetailsOfATaskSubscription: Subscription;
  constructor(public pt: ProjectTaskService, private store: Store) {}
  ngOnInit(): void {
    this.loadProjectTasks();

    this.storeSubscription = this.store
      .select((state) => state)
      .subscribe((data: any) => {
        this.userId = data?.userDetailsState?.userId;
      });
  }

  //To load all the task of a project on iniital load
  loadProjectTasks() {
    this.getProjectTaskSubscription = this.pt
      .getProjectTasks(this.projectId)
      .subscribe(
        (data: task[]) => {
          this.projectTasks = data;
          const completedTask: task[] = data.filter(
            (task: task) => task.status === 'Completed'
          );
          this.pt.updateProjectCompletionRate((completedTask.length / data.length)*100);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //For detecting changes in the task
  onTaskChange() {
    this.loadProjectTasks();
  }

  //To select a task from the list
  handleTaskClick(taskId: string) {
    this.pt.getDetailsOfATask(taskId).subscribe(
      (data: task) => {
        this.selectedTask = data;
        this.pt.updateActivateModal();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.getProjectTaskSubscription) {
      this.getProjectTaskSubscription.unsubscribe();
    }
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    if (this.getDetailsOfATaskSubscription) {
      this.getDetailsOfATaskSubscription.unsubscribe();
    }
  }
}
