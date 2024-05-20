import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'; // Ensure the correct path
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'strzelnicaAngular';

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }
}
