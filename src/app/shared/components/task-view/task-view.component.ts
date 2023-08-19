import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { task } from 'src/app/config/config.types';
import { ProjectTaskService } from '../project-task/project-task.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css'],
})
export class TaskViewComponent implements OnInit, OnDestroy {
  @Input() task: task;
  name:string
  userId:string
  deleteTaskSubscription: Subscription;
  updateTaskStatusSubscription: Subscription;
  storeSusbcription:Subscription
  @Output() taskChangeEmit: EventEmitter<boolean> = new EventEmitter();
  constructor(private pt: ProjectTaskService,private store:Store) {}

  ngOnInit(): void {
    this.storeSusbcription = this.store
      .select((state) => state)
      .subscribe((data: any) => {
        this.name = data?.userDetailsState?.name;
        this.userId = data?.userDetailsState?.userId;
      });
  }

  ngOnDestroy(): void {
    if (this.deleteTaskSubscription) {
      this.deleteTaskSubscription.unsubscribe();
    }
    if (this.updateTaskStatusSubscription) {
      this.updateTaskStatusSubscription.unsubscribe();
    }
    if(this.storeSusbcription){
      this.storeSusbcription.unsubscribe()
    }
  }

  deleteTask() {
    this.deleteTaskSubscription = this.pt.deleteTask(this.task._id).subscribe(
      (data: { deleted: boolean }) => {
        if (data.deleted) {
          this.taskChangeEmit.emit(true);
          this.pt.updateActivateModal();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onStatusChane(event: any): void {
    this.updateTaskStatusSubscription = this.pt.updateTaskStatus(this.userId,this.task._id,event?.target?.value).subscribe((data:{updated:boolean})=>{
      if(data.updated){
        this.taskChangeEmit.emit(true);
        this.pt.updateActivateModal();
      }
    },(error)=>{
      console.log(error);
      
    })
  }
}
