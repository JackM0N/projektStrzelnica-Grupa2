import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost:8080/users');
  }
  
  updateUser(id: number, updatedUser: Users): Observable<Users> {
    return this.http.put<Users>(`http://localhost:8080/users/edit/${id}`, updatedUser);
  }
}