import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tracktype } from '../interfaces/tracktype';

@Injectable({
  providedIn: 'root'
})
// Service for handling CRUD operations on tracktypes
export class TracktypesService {
  private baseUrl = 'http://localhost:8080/tracktypes';
  private postUrl = 'http://localhost:8080/tracktypes/add';
  private editUrl = 'http://localhost:8080/tracktypes/edit';

  constructor(private http: HttpClient) {}
  // Fetch all tracktypes from the database
  getAllTracktypes(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get<any>(url);
  }
  
  // Adding a tracktype to the database
  addTracktype(tracktype?: Tracktype): Observable<Tracktype> {
    return this.http.post<Tracktype>(this.postUrl, tracktype);
  }

  // Editing a tracktype in the database
  updateTracktype(tracktype: Tracktype): Observable<Tracktype> {
    const url = `${this.editUrl}/${tracktype.id}`;
    return this.http.put<Tracktype>(url, tracktype);
  }

  // Delete a tracktype from the database
  deleteTracktype(tracktypeId: number): Observable<Tracktype> {
    const url = `${this.baseUrl}/${tracktypeId}`;
    return this.http.delete<Tracktype>(url);
  }

  // Fetch a specific tracktype from the database
  getTracktypeById(tracktypeId: number): Observable<Tracktype> {
    const url = `${this.baseUrl}/${tracktypeId}`;
    return this.http.get<Tracktype>(url);
  }
}
