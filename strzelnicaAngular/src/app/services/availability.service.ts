import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateAvailability } from '../interfaces/dateavailability';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private baseUrl = 'http://localhost:8080/availability';

  constructor(private http: HttpClient) {}

  getAvailabilitiesByServiceId(serviceId: number): Observable<DateAvailability[]> {
    const url = `${this.baseUrl}/${serviceId}`;
    return this.http.get<DateAvailability[]>(url);
  }

  filterDatesWithSameDate(selectedDate: Date, availableDatesList: DateAvailability[]): DateAvailability[] {
    return availableDatesList.filter(date => new Date(date.date).getTime() === selectedDate.getTime());
  }

  /*
  Wrong code for testing backend checks
  isDateAvailable(date: Date, availableDatesList: DateAvailability[]): boolean {
    return availableDatesList.some(availDate => new Date(availDate.date).getDate() == date.getDate());
  }
  */

  isDateAvailable(date: Date, availableDatesList: DateAvailability[]): boolean {
    // Extract year, month, and day from the provided date
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // Check if any available date matches the year, month, and day of the provided date
    return availableDatesList.some(availDate => {
        const availDateObj = new Date(availDate.date);
        return availDateObj.getFullYear() === year && availDateObj.getMonth() === month && availDateObj.getDate() === day;
    });
  }
}
