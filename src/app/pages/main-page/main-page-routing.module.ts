import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/swarm',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import(
            '../../shared/components/home-component/home-component.module'
          ).then((m) => m.HomeComponentModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import(
            '../../shared/components/user-account/user-account.module'
          ).then((m) => m.UserAccountModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('../../shared/components/wp-form/wp-form.module').then(
            (m) => m.WpFormModule
          ),
      },
      {
        path: 'workspaceInvitation/:workspaceId/:encEmail/:decision',
        loadChildren: () =>
          import(
            '../../shared/components/verify-workspace-invitation/verify-workspace-invitation.module'
          ).then((m) => m.VerifyWorkspaceInvitationModule),
      },
      {
        path: 'workspace',
        loadChildren: () =>
          import('../../shared/components/workspace/workspace.module').then(
            (m) => m.WorkspaceModule
          ),
      },
      {
        path:'project/:projectId',
        loadChildren: () => import('../../shared/components/project-task/project-task.module').then(m => m.ProjectTaskModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
