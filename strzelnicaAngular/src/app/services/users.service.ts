import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users'; // Import the Users interface

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private baseUrl = 'http://localhost:8080/users';
  private postUrl = 'http://localhost:8080/users/add';
  private editUrl = 'http://localhost:8080/users/edit';

  constructor(private http: HttpClient) {}

  // Fetch all users from the database
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl);
  }

  // Fetch paginated users from the database
  getPaginatedUsers(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    return this.http.get<any>(this.baseUrl, {params});
  }

  // Adding user to the database
  addUser(user?: Users): Observable<Users> {
    return this.http.post<Users>(this.postUrl, user);
  }

  // Editing user in the database
  updateUser(user: Users): Observable<Users> {
    const url = `${this.editUrl}/${user.id}`;
    return this.http.put<Users>(url, user);
  }

  // Delete user from the database
  deleteUser(userId: number): Observable<Users> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.delete<Users>(url);
  }

  // Fetch specific user from the database
  getUserById(userId: number): Observable<Users> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.get<Users>(url);
  }
}
