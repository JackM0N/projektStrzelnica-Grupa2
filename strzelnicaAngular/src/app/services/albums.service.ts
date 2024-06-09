import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
// Service for handling CRUD operations on albums
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
  addAlbum(album?: Album): Observable<Album> {
    return this.http.post<Album>(this.postUrl, album);
  }

  // Editing an album in the database
  updateAlbum(album: Album): Observable<Album> {
    const url = `${this.editUrl}/${album.id}`;
    return this.http.put<Album>(url, album);
  }

  // Delete an album from the database
  deleteAlbum(albumId: number): Observable<Album> {
    const url = `${this.baseUrl}/${albumId}`;
    return this.http.delete<Album>(url);
  }
}
