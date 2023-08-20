import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrentRouteService {
  private currentRoute: string;

  constructor(private router: Router) {
    // Subscribe to route changes to update the current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event?.url;
        console.log('Current route:', this.currentRoute);
      });

  }

  getCurrentRoute(): string {
    return this.currentRoute;
  }
}
