import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkspaceService } from './workspace.service';
import { Subscription } from 'rxjs';
import { project, workspace, workspaces } from 'src/app/config/config.types';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  workspaces: workspaces; //All workspaces
  selectedWorkspace: workspace; //Selected one
  selectedWorkspaceProjects: any;
  userId: string;
  email: string;
  getAllWorkspaceSubscription: Subscription;
  storeSubscription: Subscription;
  getSelectedWorkspaceSubscription: Subscription;
  getSelectedWorkspaceProjectSubscription: Subscription;
  constructor(
    public workspaceService: WorkspaceService,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.storeSubscription = this.store
      .select((state) => state)
      .subscribe((data: any) => {
        this.userId = data?.userDetailsState?.userId;
        this.email = data?.userDetailsState?.email;
      });
    this.loadWorkspaces();
  }
  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    if (this.getAllWorkspaceSubscription) {
      this.getAllWorkspaceSubscription.unsubscribe();
    }
    if (this.getSelectedWorkspaceSubscription) {
      this.getSelectedWorkspaceSubscription.unsubscribe();
    }
    if (this.getSelectedWorkspaceProjectSubscription) {
      this.getSelectedWorkspaceProjectSubscription.unsubscribe();
    }
    this.workspaceService.updateWorkspaceClickedReset();
  }

  loadWorkspaces = () => {
    this.getAllWorkspaceSubscription = this.workspaceService
      .getAllWorkspaces(this.userId, this.email)
      .subscribe(
        (data: workspaces) => {
          this.workspaces = data;
        },
        (error) => {
          console.log(error);
        }
      );
  };

  getSelectedWorkspace = (workspaceId: string) => {
    this.getSelectedWorkspaceSubscription = this.workspaceService
      .selectWorkspace(workspaceId)
      .subscribe(
        (data: workspace) => {
          this.selectedWorkspace = data;

          this.getSelectedWorkspaceProjectSubscription = this.workspaceService
            .getProjectsOfSelectedWorkspace(workspaceId)
            .subscribe(
              (data) => {
                this.selectedWorkspaceProjects = data;
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
  };

  
}
