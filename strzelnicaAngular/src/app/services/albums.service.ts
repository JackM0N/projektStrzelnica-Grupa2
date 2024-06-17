import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private baseUrl = 'http://localhost:8080/albums';
  private postUrl = 'http://localhost:8080/albums/add';
  private editUrl = 'http://localhost:8080/albums/edit';

  constructor(private http: HttpClient) {}

  // Fetch a specific album from the database
  getAlbum(albumId: number): Observable<Album> {
    const url = `${this.baseUrl}/${albumId}`;
    return this.http.get<Album>(url);
  }

  // Fetch a specific album from the database by competition id
  getAlbumByCompetition(competitionId: number): Observable<Album> {
    const url = `${this.baseUrl}/comp/${competitionId}`;
    return this.http.get<Album>(url);
  }

  // Adding an album to the database
  addAlbum(album: Album): Observable<Album> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const transformedAlbum = this.transformAlbum(album);
    return this.http.post<Album>(this.postUrl, transformedAlbum, { headers });
  }

  // Editing an album in the database
  updateAlbum(album: Album): Observable<Album> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.editUrl}/${album.id}`;
    const transformedAlbum = this.transformAlbum(album);
    return this.http.put<Album>(url, transformedAlbum, { headers });
  }

  // Delete an album from the database
  deleteAlbum(albumId: number): Observable<Album> {
    const url = `${this.baseUrl}/${albumId}`;
    return this.http.delete<Album>(url);
  }

  // Helper method to transform album for API
  private transformAlbum(album: Album): any {
    return {
      ...album,
      // Optionally transform images or other properties here
    };
  }
}
