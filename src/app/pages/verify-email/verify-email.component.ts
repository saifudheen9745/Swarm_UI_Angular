import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { VerifyEmailService } from './verify-email.service';
import { loginResponsePostConfirmation } from 'src/app/config/config.types';
import { Subscription } from 'rxjs';
import {Store} from '@ngrx/store'
import { setUserDetails } from 'src/app/shared/ngrx/ngrx.actions';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  confirmVerifyLinkSubscription:Subscription
  activatedRouteSubscription:Subscription
  deleteUserSubscription:Subscription
  alreadyVerified: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private verifyEmailService: VerifyEmailService,
    private router: Router,
    private store:Store
  ) {}

  ngOnInit(): void {
    // Access parameter using paramMap
    this.activatedRouteSubscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const token = params.get('token');

      this.confirmVerifyLinkSubscription = this.verifyEmailService
        .confirmVerifyLink(id as string, token as string)
        .subscribe(
          (data: loginResponsePostConfirmation) => {
            if (data.verified) {
              this.store.dispatch(setUserDetails({
                userId:data.userId,
                name:data.name,
                email:data.email,
                accessToken:data.accessToken
              }))
              this.router.navigate(['/home']);
            }
          },
          (error: any) => {
            //For users already verified
            if (error?.error?.error?.error?.msg === 'User already verified') {
              this.alreadyVerified = true;
            } else {
              this.deleteUserSubscription = this.verifyEmailService
                .deleteAUser(id as string)
                .subscribe((data) => {
                  
                });
            }
          }
        );
    });
  }

  ngOnDestroy(): void {
    if(this.confirmVerifyLinkSubscription){
      this.confirmVerifyLinkSubscription.unsubscribe()
    }
    if(this.deleteUserSubscription){
      this.deleteUserSubscription.unsubscribe()
    }
    if(this.activatedRouteSubscription){
      this.activatedRouteSubscription.unsubscribe()
    }
  }
}
