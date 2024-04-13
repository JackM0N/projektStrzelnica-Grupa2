import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weapon } from '../interfaces/weapon';

@Injectable({
  providedIn: 'root'
})

// Service for handling CRUD operations on weapons
export class WeaponsService {
  private baseUrl = 'http://localhost:8080/weapons';
  private postUrl = 'http://localhost:8080/weapons/add';
  private editUrl = 'http://localhost:8080/weapons/edit';

  constructor(private http: HttpClient) {}

  // Fetch paginated list of weapons from the database
  getPaginatedNews(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    return this.http.get<any>(this.baseUrl, {params});
  }
}
