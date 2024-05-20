import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from '../interfaces/track';

@Injectable({
  providedIn: 'root'
})
// Service for handling CRUD operations on tracks
export class TracksService {
  private baseUrl = 'http://localhost:8080/tracks';
  private postUrl = 'http://localhost:8080/tracks/add';
  private editUrl = 'http://localhost:8080/tracks/edit';

  constructor(private http: HttpClient) {}
  // Fetch all tracks from the database
  getAllTracks(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get<any>(url);
  }
  
  // Adding a track to the database
  addTrack(track?: Track): Observable<Track> {
    return this.http.post<Track>(this.postUrl, track);
  }

  // Editing a track in the database
  updateTrack(track: Track): Observable<Track> {
    const url = `${this.editUrl}/${track.id}`;
    return this.http.put<Track>(url, track);
  }

  // Delete a track from the database
  deleteTrack(trackId: number): Observable<Track> {
    const url = `${this.baseUrl}/${trackId}`;
    return this.http.delete<Track>(url);
  }

  // Fetch a specific track from the database
  getTrackById(trackId: number): Observable<Track> {
    const url = `${this.baseUrl}/${trackId}`;
    return this.http.get<Track>(url);
  }
}
