import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'];
    const userRoles = this.authService.getRoles();

    const hasRole = userRoles.some(role => expectedRoles.includes(role));
    if (this.authService.isAuthenticated() && hasRole) {
      return true;
    } else {
      this.router.navigate(['/news']);
      return false;
    }
  }
}
