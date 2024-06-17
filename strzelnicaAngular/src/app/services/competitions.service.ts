import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../interfaces/competition';

@Injectable({
  providedIn: 'root'
})
// Service for handling CRUD operations on competitions
export class CompetitionsService {
  private baseUrl = 'http://localhost:8080/competitions';
  private postUrl = 'http://localhost:8080/competitions/add';
  private editUrl = 'http://localhost:8080/competitions/edit';

  constructor(private http: HttpClient) {}

  // Fetch paginated list of competitions from the database
  getPaginatedCompetitions(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    return this.http.get<any>(this.baseUrl, { params });
  }

  // Fetch all competitions from the database
  getAllCompetitions(): Observable<any> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<any>(url);
  }

  // Adding a competition to the database
  addCompetition(competition?: Competition): Observable<Competition> {
    return this.http.post<Competition>(this.postUrl, competition);
  }

  // Editing a competition in the database
  updateCompetition(competition: Competition): Observable<Competition> {
    const url = `${this.editUrl}/${competition.id}`;
    return this.http.put<Competition>(url, competition);
  }

  // Delete a competition from the database
  deleteCompetition(competitionId: number): Observable<Competition> {
    const url = `${this.baseUrl}/${competitionId}`;
    return this.http.delete<Competition>(url);
  }

  // Fetch a specific competition from the database
  getCompetitionById(competitionId: number): Observable<Competition> {
    const url = `${this.baseUrl}/${competitionId}`;
    return this.http.get<Competition>(url);
  }
}
