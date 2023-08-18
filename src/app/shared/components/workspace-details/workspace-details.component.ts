import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { project, workspace } from 'src/app/config/config.types';
import { WorkspaceService } from '../workspace/workspace.service';
import { WpFormService } from '../wp-form/wp-form.service';
import { ToastService } from '../../services/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workspace-details',
  templateUrl: './workspace-details.component.html',
  styleUrls: ['./workspace-details.component.css'],
})
export class WorkspaceDetailsComponent implements OnDestroy{
  @Input() workspaceDetails: workspace;
  @Input() projectDetails: project[];
  addMembersSubscription: Subscription;

  constructor(
    private ws: WorkspaceService,
    private wp: WpFormService,
    private toast: ToastService
  ) {}

  goToWorkspaceSelect = (): void => {
    this.ws.updateWorkspaceClicked();
  };

  //this method will sent verification emails to add members to workspace
  addMembersToWorkspace(emails: string[]) {
    if (this.workspaceDetails._id) {
      console.log(this.workspaceDetails._id, emails);

      this.wp
        .addMembersToWorkspace(emails, this.workspaceDetails?._id)
        .subscribe(
          (data: { sent: boolean }) => {
            if (data.sent) {
              this.toast.customSuccessToast(
                'Verification mail has been sent to the emails'
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  ngOnDestroy(): void {
      if(this.addMembersSubscription){
        this.addMembersSubscription.unsubscribe()
      }
  }
}
