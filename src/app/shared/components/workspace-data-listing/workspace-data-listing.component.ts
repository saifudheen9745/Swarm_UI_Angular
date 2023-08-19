import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  project,
  projectMembers,
  workspace,
} from 'src/app/config/config.types';
import { ProjectTaskService } from '../project-task/project-task.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-workspace-data-listing',
  templateUrl: './workspace-data-listing.component.html',
  styleUrls: ['./workspace-data-listing.component.css'],
})
export class WorkspaceDataListingComponent implements OnDestroy, OnInit {
  @Input() heading: string;
  @Input() projects: project[];
  @Input() workspace: workspace;
  userId: string;
  projectMemberSubscription: Subscription;
  storeSubscription: Subscription;
  constructor(
    private router: Router,
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
  }
  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
  async handleProjectClick(projectId: string) {
    const isValidMember = await this.checkUser(projectId);

    if (!isValidMember) {
      this.toast.customErrorToast('You are not a member of this project');
      return;
    }
    this.router.navigate([`/project/${projectId}`]);
  }

  async checkUser(projectId: string): Promise<boolean> {
    try {
      const data: projectMembers | undefined = await this.pt
        .getRegisteredProjectMembers(projectId)
        .toPromise();

      if (data) {
        const userExists =
          data?.registerdMembers?.filter((member) => member._id === this.userId)
            .length > 0;

        return userExists;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
