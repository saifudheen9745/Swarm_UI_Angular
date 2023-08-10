import { Component, OnDestroy } from '@angular/core';
import { LoginPageService } from './login-page.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { loginResponseData } from 'src/app/config/config.types';
import { Subscription } from 'rxjs';
import {Store} from '@ngrx/store'
import { setUserDetails } from 'src/app/shared/ngrx/ngrx.actions';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';

  loginFormSubmitSubscription:Subscription
  handleGoogleLoginSubscription:Subscription

  constructor(
    private loginService: LoginPageService,
    private toasts: ToastService,
    private googleAuth: FirebaseService,
    private store: Store
  ) {

  }

  ngOnDestroy(): void {
    if(this.loginFormSubmitSubscription){
      this.loginFormSubmitSubscription.unsubscribe()
    }
    if(this.handleGoogleLoginSubscription){
      this.handleGoogleLoginSubscription.unsubscribe()
    }
  }

  validateEmail = () => {
    const isValid = emailRegex.test(this.email);
    if (isValid) {
      this.emailError = '';
    } else {
      this.emailError = 'Invalid email';
    }
  };

  validatePassword = () => {
    if (this.password.length < 8) {
      this.passwordError = 'Need atleast eight character';
    } else {
      this.passwordError = '';
    }
  };

  loginFormSubmit = () => {
    if (
      this.emailError?.length === 0 &&
      this.passwordError?.length === 0 &&
      this.email.length > 0 &&
      this.password.length > 0
    ) {
      this.loginFormSubmitSubscription = this.loginService
        .doLogin(this.email, this.password)
        .subscribe(
          (data: loginResponseData) => {
            this.store.dispatch(setUserDetails({
            userId:data.userId,
            name:data.name,
            email:data.email,
            accessToken:data.accessToken
          }))
          },
          (error: any) => {
            this.toasts.customErrorToast(error.error.error.error.msg);
          }
        );
    } else {
      this.toasts.customErrorToast('All fileds must be provided');
    }
  };

  handleGoogleLogin = async () => {
    try {
      const googleData = await this.googleAuth.loginWithGoogle();
      const { email } = googleData?.user;

      //Calling the method in service to log in using the datas from google
      this.handleGoogleLoginSubscription = this.loginService.doGoogleLogin(email as string).subscribe(
        (data: loginResponseData): void => {
          this.store.dispatch(setUserDetails({
            userId:data.userId,
            name:data.name,
            email:data.email,
            accessToken:data.accessToken
          }))
        },
        (error: any) => {
          this.toasts.customErrorToast(error?.error?.error.error.msg);
        }
      );
      //Error from the firebase
    } catch (error: unknown) {
      this.toasts.customErrorToast(
        'Sorry, something went wrong, please use another method'
      );
    }
  };
}
