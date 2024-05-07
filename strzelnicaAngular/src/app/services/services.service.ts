import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})
// Service for handling CRUD operations on services
export class ServicesService {
  private baseUrl = 'http://localhost:8080/services';
  private postUrl = 'http://localhost:8080/services/add';
  private editUrl = 'http://localhost:8080/services/edit';

  constructor(private http: HttpClient) {}

  // Fetch paginated list of services from the database
  getPaginatedServices(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    return this.http.get<any>(this.baseUrl, {params});
  }
  
  // Adding a service to the database
  addService(service?: Service): Observable<Service> {
    return this.http.post<Service>(this.postUrl, service);
  }

  // Editing a service in the database
  updateService(service: Service): Observable<Service> {
    const url = `${this.editUrl}/${service.id}`;
    return this.http.put<Service>(url, service);
  }

  // Delete a service from the database
  deleteService(serviceId: number): Observable<Service> {
    const url = `${this.baseUrl}/${serviceId}`;
    return this.http.delete<Service>(url);
  }

  // Fetch a specific service from the database
  getServiceById(serviceId: number): Observable<Service> {
    const url = `${this.baseUrl}/${serviceId}`;
    return this.http.get<Service>(url);
  }
}
