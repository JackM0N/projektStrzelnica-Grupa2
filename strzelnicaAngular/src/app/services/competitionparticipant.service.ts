import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionParticipantService {
  private baseUrl = 'http://localhost:8080/competitionparticipants';
  
  constructor(private http: HttpClient) {}

  register(userId: number, competitionId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add`, { userId, competitionId });
  }

  unregister(userId: number, competitionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${userId}/${competitionId}`);
  }

  isRegistered(userId: number, competitionId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/is-registered/${userId}/${competitionId}`);
  }
}
