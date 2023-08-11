import { Component } from '@angular/core';
import {faHome,faUser,faPieChart} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-aside-navbar',
  templateUrl: './aside-navbar.component.html',
  styleUrls: ['./aside-navbar.component.css'],
})
export class AsideNavbarComponent {
  menus = [
    { name: 'home', link: '/home', icon: faHome },
    { name: 'user', link: '/account', icon: faUser },
    {
      name: 'Workspace',
      link: '/workspace',
      icon: faPieChart,
      margin: true,
    },
  ];
  open = false;

  constructor() {}

  

  handleLogout(): void {
    localStorage.clear();
    // this.store.dispatch(resetDetails());
    // this.router.navigate(['/login']);
  }

  toggleAside(): void {
    this.open = !this.open;
    // this.store.dispatch(toggleAside());
  }
}
