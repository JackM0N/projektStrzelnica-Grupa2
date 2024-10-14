import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  login(credentials: any) {
    return this.http.post<any>('http://localhost:8080/login', credentials).pipe(
      map(response => {
        const token = response.accessToken;
        if (token && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('access_token', token);
        }
        return response;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      return token !== null && !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  getRoles(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.roles || [];
      }
    }
    return [];
  }
  
  hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getRoles();
    return roles.some(role => userRoles.includes(role));
  }

  getUserId(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return typeof decodedToken.id === 'number' ? decodedToken.id : null;
      }
    }
    return null;
  }
}
