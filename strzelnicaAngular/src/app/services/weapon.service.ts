import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weapon } from '../interfaces/weapon';

@Injectable({
  providedIn: 'root'
})

// Service for handling CRUD operations on weapons
export class WeaponService {
  private baseUrl = 'http://localhost:8080/weapons';
  private postUrl = 'http://localhost:8080/weapons/add';
  private editUrl = 'http://localhost:8080/weapons/edit';

  constructor(private http: HttpClient) {}

  // Fetch paginated list of weapons from the database
  getPaginatedWeapons(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    return this.http.get<any>(this.baseUrl, {params});
  }


  // Adding a weapon to the database
  addWeapon(weapon?: Weapon): Observable<Weapon> {
    return this.http.post<Weapon>(this.postUrl, weapon);
  }

  // Editing a weapon in the database
  updateWeapon(weapon: Weapon): Observable<Weapon> {
    const url = `${this.editUrl}/${weapon.id}`;
    return this.http.put<Weapon>(url, weapon);
  }

  // Delete a weapon from the database
  deleteWeapon(weaponId: number): Observable<Weapon> {
    const url = `${this.baseUrl}/${weaponId}`;
    return this.http.delete<Weapon>(url);
  }

  // Fetch a specific weapon from the database
  getWeaponById(weaponId: number): Observable<Weapon> {
    const url = `${this.baseUrl}/${weaponId}`;
    return this.http.get<Weapon>(url);
  }
}
