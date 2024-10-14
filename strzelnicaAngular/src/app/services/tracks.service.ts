import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from '../interfaces/track';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private baseUrl = 'http://localhost:8080/tracks';
  private postUrl = 'http://localhost:8080/tracks/add';
  private editUrl = 'http://localhost:8080/tracks/edit';

  constructor(private http: HttpClient) {}

  getAllTracks(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get<any>(url);
  }
  
  addTrack(track?: Track): Observable<Track> {
    return this.http.post<Track>(this.postUrl, track);
  }

  updateTrack(track: Track): Observable<Track> {
    const url = `${this.editUrl}/${track.id}`;
    return this.http.put<Track>(url, track);
  }

  deleteTrack(trackId: number): Observable<Track> {
    const url = `${this.baseUrl}/${trackId}`;
    return this.http.delete<Track>(url);
  }

  getTrackById(trackId: number): Observable<Track> {
    const url = `${this.baseUrl}/${trackId}`;
    return this.http.get<Track>(url);
  }
}
