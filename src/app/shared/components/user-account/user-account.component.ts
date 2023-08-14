import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAccountService } from './user-account.service';
import {
  loginResponseData,
  userAccountDetails,
} from '../../../config/config.types';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';

const spaceRegex = /\s/;
const numberRegex = /\d/;
const charRegex = /[^a-zA-Z0-9\s]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobileRegex = /^\d{10}$/;

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent implements OnInit, OnDestroy {
  userData: userAccountDetails;
  userId: string;
  storeSubscription: Subscription;
  getUserDetailsSubscription: Subscription;
  submitUserDetailsSubscription: Subscription;
  userDetails: userAccountDetails = {
    userId: '',
    fname: '',
    email: '',
    mobile: '',
  };
  userErrorDetails: userAccountDetails = {
    userId: '',
    fname: '',
    email: '',
    mobile: '',
  };
  constructor(
    private userAccountService: UserAccountService,
    private store: Store,
    private toast: ToastService
  ) {
    this.storeSubscription = this.store
      .select((state: any) => state?.userDetailsState)
      .subscribe((data: loginResponseData) => {
        this.userId = data?.userId;
        this.userDetails.userId = this.userId;
      });
  }

  ngOnInit(): void {
    this.getUserDetailsSubscription = this.userAccountService
      .getUserDetails(this.userId)
      .subscribe((data: userAccountDetails) => {
        this.userDetails.fname = data.fname;
        this.userDetails.email = data.email;
        this.userDetails.mobile = data.mobile;
      });
  }

  submitUserDeatils() {
    if (
      this.userDetails.email != '' &&
      this.userErrorDetails.email === '' &&
      this.userDetails.fname != '' &&
      this.userErrorDetails.fname === ''
    ) {
      this.submitUserDetailsSubscription = this.userAccountService
        .editUserDetails(this.userDetails)
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.toast.customErrorToast('Name and email must not be empty');
    }
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    if (this.getUserDetailsSubscription) {
      this.getUserDetailsSubscription.unsubscribe();
    }
    if (this.submitUserDetailsSubscription) {
      this.submitUserDetailsSubscription.unsubscribe();
    }
  }

  validateFullName = (): void => {
    if (this.userDetails.fname != null) {
      if (spaceRegex.test(this.userDetails.fname)) {
        this.userErrorDetails.fname = 'Spaces are not allowed';
      } else if (numberRegex.test(this.userDetails.fname)) {
        this.userErrorDetails.fname = 'Numbers are not allowed';
      } else if (charRegex.test(this.userDetails.fname)) {
        this.userErrorDetails.fname = 'Special characters are not allowed';
      } else {
        this.userErrorDetails.fname = '';
      }
    }
  };

  validateEmail = (): void => {
    if (this.userDetails.email != null) {
      if (emailRegex.test(this.userDetails.email)) {
        this.userErrorDetails.email = '';
      } else {
        this.userErrorDetails.email = 'Invalid email';
      }
    }
  };

  validateMobile = (): void => {
    if (this.userDetails.mobile != null) {
      if (mobileRegex.test(this.userDetails.mobile)) {
        this.userErrorDetails.mobile = '';
      } else {
        this.userErrorDetails.mobile = 'Invalid mobile number';
      }
    }
  };
}
