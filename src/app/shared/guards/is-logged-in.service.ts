import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { loginResponseData } from 'src/app/config/config.types';
import { CurrentRouteService } from '../services/current-route/current-route.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInService implements CanActivate {
  storeSubscription: Subscription;
  userAccessToken: string = '';
  constructor(
    private router: Router,
    private currentRouter:CurrentRouteService
  ) {}

  Routes:string[] = ['/login','/signup','/swarm']

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userDetails: any = localStorage.getItem('userDetailsState');
    const parsed: loginResponseData = JSON.parse(userDetails);

    if (!(parsed?.accessToken?.length !> 0) || parsed?.accessToken === undefined) {
      return true;
    } else {
      this.router.navigate(['/home'])
      return false;
    }
  }
}
