import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weapon } from '../interfaces/weapon';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  private baseUrl = 'http://localhost:8080/weapons';
  private postUrl = 'http://localhost:8080/weapons/add';
  private editUrl = 'http://localhost:8080/weapons/edit';

  constructor(private http: HttpClient) {}

  getPaginatedWeapons(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    return this.http.get<any>(this.baseUrl, {params});
  }
  
  addWeapon(weapon?: Weapon): Observable<Weapon> {
    return this.http.post<Weapon>(this.postUrl, weapon);
  }

  updateWeapon(weapon: Weapon): Observable<Weapon> {
    const url = `${this.editUrl}/${weapon.id}`;
    return this.http.put<Weapon>(url, weapon);
  }

  deleteWeapon(weaponId: number): Observable<Weapon> {
    const url = `${this.baseUrl}/${weaponId}`;
    return this.http.delete<Weapon>(url);
  }

  getWeaponById(weaponId: number): Observable<Weapon> {
    const url = `${this.baseUrl}/${weaponId}`;
    return this.http.get<Weapon>(url);
  }
}
