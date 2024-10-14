import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JoinRequestService {
  private apiUrl = 'http://localhost:8080/join-requests';

  constructor(private http: HttpClient) {}

  sendJoinRequest(userId: number, message: string): Observable<any> {
    const requestPayload = { userId, message };
    return this.http.post(this.apiUrl, requestPayload);
  }
}
