import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceAvailability } from '../interfaces/serviceavailability';

@Injectable({
  providedIn: 'root'
})
// Service for handling CRUD operations on service availabilities
export class ServiceAvailabilitiesService {
  private baseUrl = 'http://localhost:8080/serviceavailabilities';
  private postUrl = 'http://localhost:8080/serviceavailabilities/add';
  private editUrl = 'http://localhost:8080/serviceavailabilities/edit';

  constructor(private http: HttpClient) {}

  // Fetch list of service availabilities for a specific service from the database
  getServiceAvailabilitiesByServiceId(serviceId: number): Observable<ServiceAvailability[]> {
    const url = `${this.baseUrl}/${serviceId}`;
    return this.http.get<ServiceAvailability[]>(url);
  }

  // Fetch paginated list of service availabilities for a specific service from the database
  getPaginatedServiceAvailabilitiesByServiceId(serviceId: number, page: number, size: number): Observable<ServiceAvailability[]> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    const url = `${this.baseUrl}/paginated/${serviceId}`;
    return this.http.get<ServiceAvailability[]>(url, {params});
  }
  
  // Adding a service availability to the database
  addServiceAvailability(ServiceAvailability?: ServiceAvailability): Observable<ServiceAvailability> {
    return this.http.post<ServiceAvailability>(this.postUrl, ServiceAvailability);
  }

  // Editing a service availability in the database
  updateServiceAvailability(ServiceAvailability: ServiceAvailability): Observable<ServiceAvailability> {
    const url = `${this.editUrl}/${ServiceAvailability.id}`;
    return this.http.put<ServiceAvailability>(url, ServiceAvailability);
  }

  // Delete a service availability from the database
  deleteServiceAvailability(serviceAvailabilityId: number): Observable<ServiceAvailability> {
    const url = `${this.baseUrl}/${serviceAvailabilityId}`;
    return this.http.delete<ServiceAvailability>(url);
  }
}
