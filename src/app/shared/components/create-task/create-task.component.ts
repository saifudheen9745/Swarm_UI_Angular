import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormServiceService } from '../../services/form/form-service.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProjectTaskService } from '../project-task/project-task.service';
import { project, projectMembers } from 'src/app/config/config.types';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  @Input() projectId: string;
  @Input() userId: string;
  loader: boolean;
  @Output() taskChangeEmit: EventEmitter<boolean> = new EventEmitter();
  projectMembers: projectMembers;
  createForm: FormGroup;
  selectedMembersForProject: string[] = [];
  storeSubscription: Subscription;
  projectMemberSubscription: Subscription;
  createTaskSubscription: Subscription;
  constructor(
    private form: FormServiceService,
    private pt: ProjectTaskService,
    private store: Store,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select((state) => state)
      .subscribe((data: any) => {
        this.userId = data?.userDetailsState?.userId;
      });
    this.projectMemberSubscription = this.pt
      .getRegisteredProjectMembers(this.projectId)
      .subscribe(
        (data: projectMembers) => {
          this.projectMembers = data;
        },
        (error) => {
          console.log(error);
        }
      );
    this.createForm = this.form.createTaskForm();
    if (this.projectId && this.userId) {
      this.createForm.patchValue({
        projectId: this.projectId,
        reporter: this.userId,
      });
    }
  }

  

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    if (this.projectMemberSubscription) {
      this.projectMemberSubscription.unsubscribe();
    }
    if (this.createTaskSubscription) {
      this.createTaskSubscription.unsubscribe();
    }
  }

  selectMember(userId: string) {
    const memberIndex: number = this.selectedMembersForProject.indexOf(userId);
    if (memberIndex === -1) {
      this.selectedMembersForProject.push(userId);
    } else {
      this.selectedMembersForProject = this.selectedMembersForProject.filter(
        (mbr: string) => mbr !== userId
      );
    }
    this.createForm.patchValue({
      assignee: this.selectedMembersForProject,
    });
  }

  submitCreateTask(form: FormGroup) {
    if (form.invalid) {
      this.toast.customErrorToast('Please provide all the fields');
    } else {
      this.loader = true;
      this.createTaskSubscription = this.pt.createTask(form.value).subscribe(
        (data) => {
          this.loader = false;
          this.taskChangeEmit.emit(true);
        },
        (error) => {
          this.toast.customErrorToast(error.error.error.msg);
        }
      );
    }
  }
}
