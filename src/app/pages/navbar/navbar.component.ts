import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLogged() {
    return localStorage.getItem('currentUserToken');
  }
  logout() {
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('user');
    this.router.navigate(['/welcome']);
  }
}
