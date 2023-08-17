import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { WpFormService } from './wp-form.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { workspaces } from 'src/app/config/config.types';
import { FormServiceService } from '../../services/form/form-service.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wp-form',
  templateUrl: './wp-form.component.html',
  styleUrls: ['./wp-form.component.css'],
})
export class WpFormComponent implements OnInit, OnDestroy {
  ownedWokspaces: any[] = [];
  userId: string;
  email: string;
  storeSubscription: Subscription;
  getAllWorkspaceSubscription: Subscription;
  createWorkspaceSubscription: Subscription;
  addMembersSubscription: Subscription;
  getAllWorkspaceMemberSubscription: Subscription;
  wpFormSubmitSubscription:Subscription
  selectedWorkspace: string = '';
  selectedWorkspaceMembers: { email: string; status: string }[];
  membersForProject: string[] = [];
  wpFormGroup: FormGroup;
  constructor(
    private wpService: WpFormService,
    private store: Store,
    private toast: ToastService,
    private formService: FormServiceService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select((state) => state)
      .subscribe((data: any) => {
        this.userId = data?.userDetailsState?.userId;
        this.email = data?.userDetailsState?.email;
      });

    this.loadWorkspace();
    this.wpFormGroup = this.formService.wpForm();
    //Setting members for the project to the reactive form
  }

  //Loding workspace members for form
  loadWorkspaceMembers = () => {
    this.getAllWorkspaceMemberSubscription = this.wpService
      .getMembersOfSelectedWorkspace(this.selectedWorkspace)
      .subscribe(
        (data) => {
          this.selectedWorkspaceMembers = data.members;
        },
        (error) => {
          console.log(error);
        }
      );
  };
  //Loading owned workspaces for form
  loadWorkspace = () => {
    this.getAllWorkspaceSubscription = this.wpService
      .getAllWorkspaces(this.userId, this.email)
      .subscribe(
        (data: workspaces) => {
          this.ownedWokspaces = data?.ownedWorkspaces;
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // To load the members of the workspace upon selecting workspace
  change() {
    this.selectedWorkspace = this.wpFormGroup.get('workspace')?.value;
    this.loadWorkspaceMembers();
  }

  //method to select members for project
  selectMember(member: string) {
    const memberIndex: number = this.membersForProject.indexOf(member);
    if (memberIndex === -1) {
      this.membersForProject.push(member);
    } else {
      this.membersForProject = this.membersForProject.filter(
        (mbr: string) => mbr !== member
      );
    }
    this.wpFormGroup.patchValue({
      members: this.membersForProject,
    });
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    if (this.getAllWorkspaceSubscription) {
      this.getAllWorkspaceSubscription.unsubscribe();
    }
    if (this.createWorkspaceSubscription) {
      this.createWorkspaceSubscription.unsubscribe();
    }
    if (this.addMembersSubscription) {
      this.addMembersSubscription.unsubscribe();
    }
    if (this.getAllWorkspaceMemberSubscription) {
      this.getAllWorkspaceMemberSubscription.unsubscribe();
    }
    if(this.wpFormSubmitSubscription){
      this.wpFormSubmitSubscription.unsubscribe()
    }
  }

  createWorkspace(workspaceDetails: { name: string; theme: string }) {
    this.createWorkspaceSubscription = this.wpService
      .createNewWorkspace({
        name: workspaceDetails.name,
        theme: workspaceDetails.theme,
        master: this.userId,
      })
      .subscribe(
        (data: { msg: string }) => {
          this.toast.customSuccessToast('New workspace created');
          this.loadWorkspace();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //Method to add members to workspace
  addMembersToWorkspace(emails: string[]) {
    if (this.selectedWorkspace === '') {
      this.toast.customErrorToast('Please select a workspace');
      return;
    } else {
      this.addMembersSubscription = this.wpService
        .addMembersToWorkspace(emails, this.selectedWorkspace)
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

  wpFormSubmit(form: FormGroup) {
    if(form.invalid){
      this.toast.customErrorToast('All fields are required')
      return 
    }
    this.wpFormSubmitSubscription = this.wpService
      .createProject(form.value)
      .subscribe(
        (data) => {
          this.toast.customSuccessToast('Project creation successfull')
          this.router.navigate(['/workspace'])
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
