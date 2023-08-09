import { Component } from '@angular/core';
import {
  loginResponseData,
  userRegisterDetals,
} from 'src/app/config/config.types';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { SignupPageService } from './signup-page.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

const spaceRegex = /\s/;
const numberRegex = /\d/;
const charRegex = /[^a-zA-Z0-9\s]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobileRegex = /^\d{10}$/;

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  SignUpDetails: userRegisterDetals = {
    fname: null,
    email: null,
    mobile: null,
    password: null,
    cnfpassword: null,
  };

  SignupErrorDetails: userRegisterDetals = {
    fname: null,
    email: null,
    mobile: null,
    password: null,
    cnfpassword: null,
  };

  constructor(
    private googlAuth: FirebaseService,
    private signupService: SignupPageService,
    private toasts: ToastService
  ) {}

  validateFullName = (): void => {
    if (this.SignUpDetails.fname != null) {
      if (spaceRegex.test(this.SignUpDetails.fname)) {
        this.SignupErrorDetails.fname = 'Spaces are not allowed';
      } else if (numberRegex.test(this.SignUpDetails.fname)) {
        this.SignupErrorDetails.fname = 'Numbers are not allowed';
      } else if (charRegex.test(this.SignUpDetails.fname)) {
        this.SignupErrorDetails.fname = 'Special characters are not allowed';
      } else {
        this.SignupErrorDetails.fname = null;
      }
    }
  };

  validateEmail = (): void => {
    if (this.SignUpDetails.email != null) {
      if (emailRegex.test(this.SignUpDetails.email)) {
        this.SignupErrorDetails.email = null;
      } else {
        this.SignupErrorDetails.email = 'Invalid email';
      }
    }
  };

  validateMobile = (): void => {
    if (this.SignUpDetails.mobile != null) {
      if (mobileRegex.test(this.SignUpDetails.mobile)) {
        this.SignupErrorDetails.mobile = null;
      } else {
        this.SignupErrorDetails.mobile = 'Invalid mobile number';
      }
    }
  };

  validatePassword = (): void => {
    if (this.SignUpDetails.password != null) {
      if (spaceRegex.test(this.SignUpDetails.password)) {
        this.SignupErrorDetails.password = null;
      } else {
        if (this.SignUpDetails.password?.length >= 8) {
          this.SignupErrorDetails.password = null;
        } else {
          this.SignupErrorDetails.password =
            'Password must be atleast 8 characters';
        }
      }
    }
  };

  validateConfirmPassword = (): void => {
    if (
      this.SignUpDetails.cnfpassword != null &&
      this.SignUpDetails.password != null
    ) {
      if (this.SignUpDetails.password?.length > 0) {
        this.SignupErrorDetails.cnfpassword = null;
        if (this.SignUpDetails.password === this.SignUpDetails.cnfpassword) {
          this.SignupErrorDetails.cnfpassword = null;
        } else {
          this.SignupErrorDetails.cnfpassword = "Password doesn't match";
        }
      } else {
        this.SignupErrorDetails.cnfpassword =
          'Must enter password before confirm password';
      }
    }
  };

  signUpWithgoogle = async () => {
    try {
      const googleDetails = await this.googlAuth.loginWithGoogle();
      const { displayName, email } = googleDetails?.user;
      this.signupService
        .doRegisterWithGoogle({
          fname: displayName as string,
          email: email as string,
        })
        .subscribe(
          (data: loginResponseData) => {
            //After getting the datas from backend after google register
            console.log(data);
          },
          (error: any) => {
            this.toasts.customErrorToast(error.error.error.error.msg);
          }
        );
    } catch (error:unknown) {
      this.toasts.customErrorToast(
        'Sorry, something went wrong, please use another method'
      );
    }
  };

  submitSignupForm = () => {
    const signupDetailsValidate = Object.values(this.SignUpDetails).every(
      (item) => item !== null
    );
    const signupErrorValidate = Object.values(this.SignupErrorDetails).every(
      (item) => item === null
    );
    if (signupDetailsValidate && signupErrorValidate) {
      this.signupService.doRegister(this.SignUpDetails).subscribe(
        (data) => {
          //After getting datas from backend after manual registration
          console.log(data);
        },
        (error:any) => {
          this.toasts.customErrorToast(error.error.error.error.msg);
        }
      );
    } else {
      this.toasts.customErrorToast('All fields are required');
    }
  };
}
