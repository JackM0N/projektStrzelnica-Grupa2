import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceUnavailability } from '../interfaces/serviceunavailability';

@Injectable({
  providedIn: 'root'
})
export class ServiceUnavailabilitiesService {
  private baseUrl = 'http://localhost:8080/serviceunavailabilities';
  private postUrl = 'http://localhost:8080/serviceunavailabilities/add';
  private editUrl = 'http://localhost:8080/serviceunavailabilities/edit';

  constructor(private http: HttpClient) {}

  // Fetch list of service unavailabilities for a specific service from the database
  getServiceUnavailabilitiesByServiceId(serviceId: number): Observable<ServiceUnavailability[]> {
    const url = `${this.baseUrl}/${serviceId}`;
    return this.http.get<ServiceUnavailability[]>(url);
  }
  
  // Fetch paginated list of service unavailabilities for a specific service from the database
  getPaginatedServiceUnavailabilitiesByServiceId(serviceId: number, page: number, size: number): Observable<ServiceUnavailability[]> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    const url = `${this.baseUrl}/paginated/${serviceId}`;
    return this.http.get<ServiceUnavailability[]>(url, {params});
  }

  addServiceUnavailability(serviceUnavailability?: ServiceUnavailability): Observable<ServiceUnavailability> {
    return this.http.post<ServiceUnavailability>(this.postUrl, serviceUnavailability);
  }

  updateServiceUnavailability(serviceUnavailability: ServiceUnavailability): Observable<ServiceUnavailability> {
    const url = `${this.editUrl}/${serviceUnavailability.id}`;
    return this.http.put<ServiceUnavailability>(url, serviceUnavailability);
  }

  deleteServiceUnavailability(serviceUnavailabilityId: number): Observable<ServiceUnavailability> {
    const url = `${this.baseUrl}/${serviceUnavailabilityId}`;
    return this.http.delete<ServiceUnavailability>(url);
  }
}
