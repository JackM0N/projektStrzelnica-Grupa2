import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
// Service for handling CRUD operations on users
export class UserService {
  private baseUrl = 'http://localhost:8080/users';
  private getByIdUrl = 'http://localhost:8080/users/id';
  private editUrl = 'http://localhost:8080/users/edit';
  private registerUrl = 'http://localhost:8080/register';
  private loginUrl = 'http://localhost:8080/login';
  private accountUrl = 'http://localhost:8080/users/account';


  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Fetch paginated list of users from the database
  getPaginatedUsers(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    return this.http.get<any>(this.baseUrl, {params});
  }
  
  // Editing a user in the database
  updateUser(user: Users): Observable<Users> {
    const url = `${this.editUrl}/${user.id}`;
    return this.http.put<Users>(url, user);
  }

  // Fetch a specific user from the database
  getUserById(userId: number): Observable<Users> {
    const url = `${this.getByIdUrl}/${userId}`;
    return this.http.get<Users>(url);
  }

  registerUser(userData: Users): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }

  getCurrentUser(): Observable<Users> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get<Users>(this.accountUrl, { headers });
  }

  updateCurrentUser(user: Users): Observable<Users> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.put<Users>(this.accountUrl, user, { headers });
  }
}