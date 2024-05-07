import { AfterViewInit, Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PopupComponent } from './popup.component';
import { DateFilterFn } from '@angular/material/datepicker';
import { Service } from '../interfaces/service';
import { ServicesService } from '../services/services.service';
import { PaginationComponent } from './pagination.component';
import { isImageValid } from '../utils/utils';
import { ServiceAvailabilitiesService } from '../services/serviceavailabilities.service';
import { ServiceAvailability } from '../interfaces/serviceavailability';
import { ServiceUnavailabilitiesService } from '../services/serviceunavailabilities.service';
import { ServiceUnavailability } from '../interfaces/serviceunavailability';
import { ServiceReservationsService } from '../services/servicereservations.service';
import { DateAvailability } from '../interfaces/dateavailability';
import { Observer } from 'rxjs';
import { ServiceReservation } from '../interfaces/servicereservation';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: [
    // Style exclusive for this component
    '../styles/offer.component.css',
    // Styles shared between all the list components
    '../styles/shared-list-styles.css',
    // Shared button styles
    '../styles/shared-button-styles.css',
    // Shared styles for Material Design
    '../styles/material-styles.scss',
  ]
})

// Component that displays offer
export class OfferComponent implements AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  @ViewChild('confirmReservationPopup') confirmReservationPopup!: PopupComponent;
  @ViewChild('reservationPopup') reservationPopup!: PopupComponent;
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
  public confirmReservationPopupMessage = '';
  public minDate: Date;
  public maxDate: Date;
  currentService?: Service;
  serviceList: Service[] = [];
  availableDatesList: DateAvailability[] = [];
  unavailableDatesList: DateAvailability[] = [];
  selectedDate: Date | null = null;
  
  serviceReservation : ServiceReservation = {
    serviceId: -1,
    date: new Date()
  };

  constructor (
    private servicesService: ServicesService,
    private serviceAvailabilitiesService: ServiceAvailabilitiesService,
    private serviceUnavailabilitiesService: ServiceUnavailabilitiesService,
    private serviceReservationsService: ServiceReservationsService,
    private cd: ChangeDetectorRef
  ) {
    this.minDate = new Date();
    this.maxDate = new Date(2024, 5, 31);
  }

  // After init - because we need the pagination to load first
  // Fetch the news from the database and display them
  ngAfterViewInit(): void {
    this.fetchServices();
    // The DOM has been changed, we need to detect the changes to prevent ExpressionChangedAfterItHasBeenCheckedError
    this.cd.detectChanges();
  }

  // Fetches all news from the database
  fetchServices(): void {
    this.servicesService.getPaginatedServices(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(services => {
      this.paginationComponent.totalPages = services.totalPages;
      this.paginationComponent.calculatePages();

      services.content.forEach((item: { content: string | null | undefined; picture: string; }) => {
          // Check if the image of the news is valid, if not, hide it
          if (!isImageValid(item.picture)) {
            item.picture = '';
          }
      });
      this.serviceList = services.content;
    });
  }

  fetchAvailability(service: Service): void {
    const observer: Observer<any> = {
      next: response => {
        // Stop if there is already a response popup
        if (this.responsePopup.showPopup == true) { return };

        this.availableDatesList = [];
        response.forEach((availability: ServiceAvailability) => {
          const startDate = new Date(availability.start_date);
          const endDate = availability.end_date ? new Date(availability.end_date) : null;
          const serviceDay = new Date(availability.service_day);
    
          if (!endDate || startDate.getTime() === endDate.getTime()) {
            if (startDate.getDay() === serviceDay.getDay()) {
              const reservedDate = {
                date: new Date(startDate),
                startTime: availability.service_time_start,
                endTime: availability.service_time_end
              };
              this.availableDatesList.push(reservedDate);
            }
          } else {
            for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
              if (date.getDay() === serviceDay.getDay()) {
                const reservedDate = {
                  date: new Date(date),
                  startTime: availability.service_time_start,
                  endTime: availability.service_time_end
                };
                this.availableDatesList.push(reservedDate);
              }
            }
          }
        });

        if (this.currentService) {
          this.reservationPopup.open();
        }
      },
      error: error => {
        // Stop if there is already a response popup
        if (this.responsePopup.showPopup == true) { return };

        // Show error message
        if (error.message = "error_service_availabilities_empty") {
          this.responsePopupHeader = 'Ta oferta nie ma teraz żadnych dostępnych terminów.';
          this.responsePopupMessage = '';
          this.responsePopupNgClass = 'popupError';

        } else {
          this.responsePopupHeader = 'Przy rezerwowaniu napotkano błąd.';
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
        }

        this.responsePopup.open();
        this.currentService = undefined;
      },
      complete: () => {}
    };

    this.serviceAvailabilitiesService.getServiceAvailabilitiesByServiceId(service.id).subscribe(observer);
  }

  fetchUnavailability(service: Service): void {
    // Fetch and process unavailable dates
    const observer: Observer<any> = {
      next: response => {
        // Stop if there is already a response popup
        if (this.responsePopup.showPopup == true) { return };

        this.unavailableDatesList = [];
        response.forEach((unavailability: ServiceUnavailability) => {
          if (unavailability.start_date && !unavailability.end_date) {
            const unavailableDate = {
              date: new Date(unavailability.start_date),
              startTime: unavailability.start_time,
              endTime: unavailability.end_time
            };
            this.unavailableDatesList.push(unavailableDate);

          } else if (unavailability.start_date && unavailability.end_date) {
            const startDate = new Date(unavailability.start_date);
            const endDate = new Date(unavailability.end_date);
            
            const startDateTime = new Date(startDate);
            const endDateTime = new Date(endDate);
            
            if (unavailability.start_time) {
              const startTimeComponents = unavailability.start_time.split(':').map(component => parseInt(component, 10));
              startDateTime.setHours(startTimeComponents[0], startTimeComponents[1]);
            } else {
              startDateTime.setHours(0, 0, 0, 0);
            }
    
            if (unavailability.end_time) {
              const endTimeComponents = unavailability.end_time.split(':').map(component => parseInt(component, 10));
              endDateTime.setHours(endTimeComponents[0], endTimeComponents[1]);
            } else {
              endDateTime.setHours(23, 59, 59, 999);
            }

            for (let date = startDateTime; date <= endDateTime; date.setDate(date.getDate() + 1)) {
              const unavailableDate = {
                date: new Date(date),
                startTime: unavailability.start_time,
                endTime: unavailability.end_time
              };
              this.unavailableDatesList.push(unavailableDate);
            }
          }
        });
        this.currentService = service;
      },
      error: error => {
        // Stop if there is already a response popup
        if (this.responsePopup.showPopup == true) { return };

        // Show error message
        if (error.message = "error_service_unavailabilities_empty") {
          this.unavailableDatesList = [];
          
        } else {
          this.responsePopupHeader = 'Przy rezerwowaniu napotkano błąd.';
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
          this.responsePopup.open();
          this.currentService = undefined;
        }
      },
      complete: () => {}
    };

    this.serviceUnavailabilitiesService.getServiceUnavailabilitiesByServiceId(service.id).subscribe(observer);
  }
  
  public openReservingPopup(service: Service): void {
    this.currentService = service;
    this.fetchUnavailability(service);
    this.fetchAvailability(service);
  }

  public reservationPopupCancelAction(): void {
    this.reservationPopup.close();
    this.currentService = undefined;
    this.selectedDate = null;
  }

  public reservationPopupConfirmAction(): void {
    this.reservationPopup.close();

    if (this.currentService && this.selectedDate) {
      this.confirmReservationPopupMessage = "Czy na pewno chcesz zarezerwować: " + this.currentService.name + "?"
      this.confirmReservationPopup.open();
    }
  }

  public confirmReservation(): void {
    this.confirmReservationPopup.close();

    if (this.currentService && this.selectedDate) {
      console.log("trying to make a reservation");
      console.log(this.currentService.name);
      console.log(this.selectedDate);

      const observer: Observer<any> = {
        next: response => {
          this.responsePopupHeader = 'Pomyślnie zarezerwowano.';
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: error => {
          this.responsePopupHeader = 'Przy rezerwowaniu napotkano błąd.';
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
          this.responsePopup.open();
        },
        complete: () => {}
      };

      this.serviceReservation.serviceId = this.currentService.id;
      this.serviceReservation.date = this.selectedDate;
      
      this.serviceReservationsService.addServiceReservation(this.serviceReservation).subscribe(observer);

    }
  }

  dateFilter: DateFilterFn<Date | null> = (date: Date | null) => {
    if (!date) {
      return false;
    }
  
    const selectedDate = new Date(date);
  
    // Check if the selected date is in the unavailableDatesList
    for (const unavailableDate of this.unavailableDatesList) {
      if (this.isSameDay(selectedDate, unavailableDate.date)) {
        return false;
      }
    }
  
    // Check if there is any availability for the selected date
    for (const availableDate of this.availableDatesList) {
      if (this.isSameDay(selectedDate, availableDate.date)) {
        return true;
      }
    }
  
    return false;
  };

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
}
