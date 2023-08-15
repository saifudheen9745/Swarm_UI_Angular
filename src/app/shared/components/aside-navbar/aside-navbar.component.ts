import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetUserDetails } from '../../ngrx/ngrx.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside-navbar',
  templateUrl: './aside-navbar.component.html',
  styleUrls: ['./aside-navbar.component.css'],
})
export class AsideNavbarComponent {
  constructor(private store:Store,private router:Router){}
  menus = [
    {
      name: 'home',
      link: '/home',
      icon: '../../../../assets/images/home.png',
    },
    {
      name: 'user',
      link: '/user',
      icon: '../../../../assets/images/user.png',
    },
    {
      name: 'Workspace',
      link: '/workspace',
      icon: '../../../../assets/images/workspace.png',
      margin: true,
    },
  ];
  open = false;


  handleLogout(): void {
    this.store.dispatch(resetUserDetails());
    localStorage.removeItem('userDetailsState');
    this.router.navigate(['/login']);
  }

  toggleAside(): void {
    this.open = !this.open;
    // this.store.dispatch(toggleAside());
  }
}
