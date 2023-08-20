import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetUserDetails } from '../../ngrx/ngrx.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css'],
})
export class MobileNavComponent {
  constructor(private store:Store,private router:Router) {}

  handleLogout(): void {
    this.store.dispatch(resetUserDetails());
    localStorage.removeItem('userDetailsState');
    this.router.navigate(['/login']);
  }
}
