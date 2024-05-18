import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  login(credentials: any) {
    return this.http.post<any>('http://localhost:8080/login', credentials)
      .pipe(
        map(response => {
          const token = response.accessToken; // Adjust field name if necessary
          if (token) {
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
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }
}
