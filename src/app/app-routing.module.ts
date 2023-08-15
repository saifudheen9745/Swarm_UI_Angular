import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'swarm',
    loadChildren: () =>
      import('./pages/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup-page/signup-page.module').then(
        (m) => m.SignupPageModule
      ),
  },
  {
    path: 'verifyMail/:id/:token',
    loadChildren: () =>
      import('./pages/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
