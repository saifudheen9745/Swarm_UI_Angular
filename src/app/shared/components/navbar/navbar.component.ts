import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isDarkMode: boolean = true;
  constructor() {
    this.setTheme();
  }

  setTheme() {
    const value = localStorage.getItem('isDarkMode');
    if (value) {
      this.isDarkMode = false;
      document.documentElement.classList.add('dark');
    }
  }
  handleToggleClick() {
    if (this.isDarkMode) {
      localStorage.setItem('isDarkMode', 'true');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.removeItem('isDarkMode');
      document.documentElement.classList.remove('dark');
    }
    this.isDarkMode = !this.isDarkMode;
  }
}
