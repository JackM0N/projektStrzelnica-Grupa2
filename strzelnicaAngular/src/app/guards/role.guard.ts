import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['expectedRoles'] as string[];
  const userRoles = authService.getRoles();
  const hasRole = userRoles.some(role => expectedRoles.includes(role));

  if (authService.isAuthenticated() && hasRole) {
    return true;
  } else {
    router.navigate(['/news']);
    return false;
  }
};
