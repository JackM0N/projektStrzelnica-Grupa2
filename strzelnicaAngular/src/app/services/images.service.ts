import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private baseUrl = 'http://localhost:8080/images';
  private postUrl = 'http://localhost:8080/images/add';
  private editUrl = 'http://localhost:8080/images/edit';

  constructor(private http: HttpClient) {}

  // Upload images to the server
  uploadImages(images: string[]): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.postUrl}`, images, { headers });
  }
}
