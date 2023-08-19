import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormServiceService } from '../../services/form/form-service.service';
import { FormGroup } from '@angular/forms';
import { ProjectTaskService } from '../project-task/project-task.service';
import { comment, task } from 'src/app/config/config.types';
import { ToastService } from '../../services/toast/toast.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.css'],
})
export class TaskCommentComponent implements OnInit, OnDestroy {
  @Input() taskId: string;
  commentForm: FormGroup;
  name: string;
  userId: string;
  getTaskDetailsSubscription: Subscription;
  addCommentSubscription: Subscription;
  storeSusbcription:Subscription
  allComments: comment[];
  constructor(
    private formService: FormServiceService,
    private ts: ProjectTaskService,
    private toast: ToastService,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.commentForm = this.formService.createCommentForm();
    this.storeSusbcription = this.store
      .select((state) => state)
      .subscribe((data: any) => {
        this.name = data?.userDetailsState?.name;
        this.userId = data?.userDetailsState?.userId
      });
    this.loadAllComments();
  }

  ngOnDestroy(): void {
    if (this.getTaskDetailsSubscription) {
      this.getTaskDetailsSubscription.unsubscribe();
    }
    if (this.addCommentSubscription) {
      this.addCommentSubscription.unsubscribe();
    }
    if(this.storeSusbcription){
      this.storeSusbcription.unsubscribe()
    }
  }

  loadAllComments() {
    this.getTaskDetailsSubscription = this.ts
      .getDetailsOfATask(this.taskId)
      .subscribe((data: task) => {
        this.allComments = data.comments;
      });
  }

  handleAddComment(form: FormGroup) {
    console.log(form.value);

    if (form.invalid) {
      this.toast.customErrorToast('Please enter atlest 10 charancters.');
      return;
    } else {
      console.log('else');

      this.addCommentSubscription = this.ts
        .addComment({
          userId: this.userId,
          name: this.name,
          taskId: this.taskId,
          comment: form.value.comment,
        })
        .subscribe(
          (data: { updated: boolean }) => {
            if (data.updated) {
              console.log(data);

              this.loadAllComments();
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
