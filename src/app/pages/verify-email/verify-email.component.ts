import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { VerifyEmailService } from './verify-email.service';
import { loginResponsePostConfirmation } from 'src/app/config/config.types';
import { Subscription } from 'rxjs';

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
    private router: Router
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
              this.router.navigate(['']);
            }
          },
          (error: any) => {
            //For users already verified
            if (error?.error?.error?.error?.msg === 'User already verified') {
              this.alreadyVerified = true;
            } else {
              this.deleteUserSubscription = this.verifyEmailService
                .deleteAUser(id as string)
                .subscribe((data) => {});
            }
          }
        );
    });
  }

  ngOnDestroy(): void {
      this.confirmVerifyLinkSubscription.unsubscribe()
      this.deleteUserSubscription.unsubscribe()
      this.activatedRouteSubscription.unsubscribe()
  }
}
