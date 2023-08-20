import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { IsLoggedInService } from './shared/guards/is-logged-in.service';

const routes: Routes = [
  {
    path: 'swarm',
    loadChildren: () =>
      import('./pages/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
    canActivate: [IsLoggedInService],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
    canActivate: [IsLoggedInService],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup-page/signup-page.module').then(
        (m) => m.SignupPageModule
      ),
    canActivate: [IsLoggedInService],
  },
  {
    path: 'verifyMail/:id/:token',
    loadChildren: () =>
      import('./pages/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailModule
      ),
    canActivate: [IsLoggedInService],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
