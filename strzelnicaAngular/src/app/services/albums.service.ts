import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private baseUrl = 'http://localhost:8080/albums';
  private addUrl = 'http://localhost:8080/albums/add';
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

  // Add an album including images
  addAlbum(album: Album): Observable<Album> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Album>(`${this.baseUrl}/add`, album, { headers });
  }

  // Update an album including images
  updateAlbum(album: Album): Observable<Album> {
    const formData = new FormData();
    formData.append('album', JSON.stringify(album)); // Convert album to JSON string and append to form data

    // Append images to FormData
    album.images.forEach((image, index) => {
      formData.append('image' + index, image);
    });

    const url = `${this.editUrl}/${album.id}`;
    const headers = new HttpHeaders().set('enctype', 'multipart/form-data');

    return this.http.put<Album>(url, formData, { headers });
  }

  // Delete an album from the database
  deleteAlbum(albumId: number): Observable<Album> {
    const url = `${this.baseUrl}/${albumId}`;
    return this.http.delete<Album>(url);
  }
}
