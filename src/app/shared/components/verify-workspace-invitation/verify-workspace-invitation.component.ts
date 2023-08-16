import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { loginResponseData } from 'src/app/config/config.types';
import { environment } from 'src/environment/environment';
import { setUserDetails } from '../../ngrx/ngrx.actions';

@Component({
  selector: 'app-verify-workspace-invitation',
  templateUrl: './verify-workspace-invitation.component.html',
  styleUrls: ['./verify-workspace-invitation.component.css'],
})
export class VerifyWorkspaceInvitationComponent implements OnInit, OnDestroy {
  verifyMailSubscription:Subscription
  constructor(
    private routes: ActivatedRoute,
    private http: HttpClient,
    private store: Store,
    private router:Router
  ) {}
  ngOnInit(): void {
    const workspaceId: string | null =
      this.routes.snapshot.paramMap.get('workspaceId');
    const encEmail: string | null =
      this.routes.snapshot.paramMap.get('encEmail');
    const decision: string | null =
      this.routes.snapshot.paramMap.get('decision');

    this.verifyMail(
      workspaceId as string,
      encEmail as string,
      decision as string
    ).subscribe(
      (data:loginResponseData) => {
        this.store.dispatch(
          setUserDetails({
            userId: data.userId,
            name: data.name,
            email: data.email,
            accessToken: data.accessToken,
          })
        );
      },
      (error) => {
         this.router.navigate(['/signup']);
      }
    );

    
  }

  ngOnDestroy(): void {
      if(this.verifyMailSubscription){
        this.verifyMailSubscription.unsubscribe()
      }
  }
  
  verifyMail(
    workspaceId: string,
    encEmail: string,
    decision: string
  ): Observable<loginResponseData> {
    return this.http.get<loginResponseData>(
      `${environment.baseUrl}/workspace/verifyinvitationmail/${workspaceId}/${encEmail}/${decision}`
    );
  }
}
