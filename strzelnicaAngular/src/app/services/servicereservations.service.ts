import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceReservation } from '../interfaces/servicereservation';

@Injectable({
  providedIn: 'root'
})
export class ServiceReservationsService {
  private baseUrl = 'http://localhost:8080/servicereservations';
  private postUrl = 'http://localhost:8080/servicereservations/add';
  private editUrl = 'http://localhost:8080/servicereservations/edit';

  constructor(private http: HttpClient) {}

  // Fetch paginated list of service reservations from the database
  getPaginatedServiceReservations(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    return this.http.get<any>(this.baseUrl, {params});
  }

  // Fetch list of service reservations for a specific service from the database
  getServiceReservationsByServiceId(serviceId: number): Observable<ServiceReservation[]> {
    const url = `${this.baseUrl}/${serviceId}`;
    return this.http.get<ServiceReservation[]>(url);
  }

  // Fetch paginated list of service reservations for a specific service from the database
  getPaginatedServiceReservationsByServiceId(serviceId: number, page: number, size: number): Observable<ServiceReservation[]> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    const url = `${this.baseUrl}/paginated/${serviceId}`;
    return this.http.get<ServiceReservation[]>(url, {params});
  }
  
  addServiceReservation(serviceReservation?: ServiceReservation): Observable<ServiceReservation> {
    return this.http.post<ServiceReservation>(this.postUrl, serviceReservation);
  }

  updateServiceReservation(serviceReservation: ServiceReservation): Observable<ServiceReservation> {
    const url = `${this.editUrl}/${serviceReservation.id}`;
    return this.http.put<ServiceReservation>(url, serviceReservation);
  }

  deleteServiceReservation(serviceReservationId: number): Observable<ServiceReservation> {
    const url = `${this.baseUrl}/${serviceReservationId}`;
    return this.http.delete<ServiceReservation>(url);
  }
}
