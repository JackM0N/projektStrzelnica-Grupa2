import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl = 'http://localhost:8080/services';
  private postUrl = 'http://localhost:8080/services/add';
  private editUrl = 'http://localhost:8080/services/edit';

  constructor(private http: HttpClient) {}

  getPaginatedServices(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    return this.http.get<any>(this.baseUrl, {params});
  }

  getAllServices(): Observable<any> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<any>(url);
  }
  
  addService(service?: Service): Observable<Service> {
    return this.http.post<Service>(this.postUrl, service);
  }

  updateService(service: Service): Observable<Service> {
    const url = `${this.editUrl}/${service.id}`;
    return this.http.put<Service>(url, service);
  }

  deleteService(serviceId: number): Observable<Service> {
    const url = `${this.baseUrl}/${serviceId}`;
    return this.http.delete<Service>(url);
  }

  getServiceById(serviceId: number): Observable<Service> {
    const url = `${this.baseUrl}/${serviceId}`;
    return this.http.get<Service>(url);
  }
}
