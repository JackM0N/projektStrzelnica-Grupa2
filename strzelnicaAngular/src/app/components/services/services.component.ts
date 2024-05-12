import { AfterViewInit, Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PopupComponent } from '../popup.component';
import { DateFilterFn } from '@angular/material/datepicker';
import { Service } from '../../interfaces/service';
import { ServicesService } from '../../services/services.service';
import { PaginationComponent } from '../pagination.component';
import { convertStringDatetime, isImageValid, isSameDay } from '../../utils/utils';
import { ServiceAvailabilitiesService } from '../../services/serviceavailabilities.service';
import { ServiceAvailability } from '../../interfaces/serviceavailability';
import { ServiceUnavailabilitiesService } from '../../services/serviceunavailabilities.service';
import { ServiceUnavailability } from '../../interfaces/serviceunavailability';
import { ServiceReservationsService } from '../../services/servicereservations.service';
import { DateAvailability } from '../../interfaces/dateavailability';
import { Observable, Observer, forkJoin } from 'rxjs';
import { ServiceReservation } from '../../interfaces/servicereservation';

@Component({
  selector: 'app-service-reservation',
  templateUrl: './services.component.html',
  styleUrls: [
    // Style exclusive for this component
    '/src/app/styles/offer.component.css',
    // Styles shared between all the list components
    '/src/app/styles/shared-list-styles.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css',
    // Shared styles for Material Design
    '/src/app/styles/material-styles.scss',
  ]
})

export class ServicesComponent implements AfterViewInit {
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
  selectedReservationTime?: number;
  datesWithSameDate: DateAvailability[] = [];
  confirmButtonClass: string = "button-confirm-disabled";
  reservationText_Title: string = "";
  reservationText_Service: string = "";
  reservationText_Date: string = "";
  reservationText_Time: string = "";
  
  serviceReservation : ServiceReservation = {
    serviceId: -1,
    date: new Date(),
    start_time: "",
    end_time: "",
  };

  constructor (
    private servicesService: ServicesService,
    private serviceAvailabilitiesService: ServiceAvailabilitiesService,
    private serviceUnavailabilitiesService: ServiceUnavailabilitiesService,
    private serviceReservationsService: ServiceReservationsService,
    private cd: ChangeDetectorRef
  ) {
    this.minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    this.maxDate = maxDate;
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

  // Add a method to fetch reservations for a service
  fetchReservations(service: Service): Observable<ServiceReservation[]> {
    return this.serviceReservationsService.getServiceReservationsByServiceId(service.id);
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
        const unavailabilities = response[0];
        const reservations = response[1];

        // Stop if there is already a response popup
        if (this.responsePopup.showPopup == true) { return };

        // Process unavailabilities
        this.unavailableDatesList = [];
        unavailabilities.forEach((unavailability: ServiceUnavailability) => {
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

        // Process reservations
        reservations.forEach((reservation: ServiceReservation) => {
          const reservedDate = {
            date: new Date(reservation.date),
            startTime: reservation.start_time,
            endTime: reservation.end_time
          };
          this.unavailableDatesList.push(reservedDate);
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

    forkJoin([
      this.serviceUnavailabilitiesService.getServiceUnavailabilitiesByServiceId(service.id),
      this.fetchReservations(service)
    ]).subscribe(observer);
  }

  public selectReservationTime(num: number): void {
    if (this.selectedReservationTime == num) {
      this.selectedReservationTime = undefined;
      this.confirmButtonClass = "button-confirm-disabled";
    } else {
      this.selectedReservationTime = num;
      this.confirmButtonClass = "button-confirm";
    }
  }

  public timeFormat(time: DateAvailability): string {
    let str = "";
  
    if (time.startTime) {
      const parts = time.startTime.split(':');
      str += parts[0] + ":" + parts[1];

      if (parts[2] != "00") {
        str += ":" + parts[2];
      }

      // Separator between start and end time
      str += " - ";
    }
  
    if (time.endTime) {
      const parts = time.endTime.split(':');
      str += parts[0] + ":" + parts[1];

      if (parts[2] != "00") {
        str += ":" + parts[2];
      }
    }
  
    return str;
  }


  public onDateChange(): void {
    this.datesWithSameDate = [];

    if (this.selectedDate != null) {
      const selectedDateWithoutTime = new Date(this.selectedDate);
      selectedDateWithoutTime.setHours(0, 0, 0, 0);

      // Filtering availableDatesList to get dates with the same date as selectedDate
      this.datesWithSameDate = this.availableDatesList.filter(dateAvailability => {
          const currentDate = new Date(dateAvailability.date);
          currentDate.setHours(0, 0, 0, 0);

          let unavailable: boolean = false;

          if (isSameDay(dateAvailability.date, selectedDateWithoutTime)) {
            this.unavailableDatesList.forEach((unavailableDate: DateAvailability) => {
              if (isSameDay(unavailableDate.date, dateAvailability.date)
                  && unavailableDate.startTime && unavailableDate.endTime
                  && dateAvailability.startTime && dateAvailability.endTime
                ) {
                const unavailStartTime = convertStringDatetime(unavailableDate.date, unavailableDate.startTime);
                const unavailEndTime = convertStringDatetime(unavailableDate.date, unavailableDate.endTime);
                
                const availStartTime = convertStringDatetime(dateAvailability.date, dateAvailability.startTime);
                const availEndTime = convertStringDatetime(dateAvailability.date, dateAvailability.endTime);

                unavailable = (unavailStartTime.getTime() <= availStartTime.getTime()
                  && unavailEndTime.getTime() >= availEndTime.getTime());
              }
            });
          }

          return currentDate.getTime() === selectedDateWithoutTime.getTime() && !unavailable;
      });
    }
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
    this.datesWithSameDate = [];
    this.selectedReservationTime = undefined;
    this.confirmButtonClass = "button-confirm-disabled";
    this.reservationText_Title = "";
    this.reservationText_Service = "";
    this.reservationText_Date = "";
  }

  public reservationPopupConfirmAction(): void {
    if (this.selectedReservationTime != undefined) {
      this.reservationPopup.close();

      if (this.currentService && this.selectedDate) {
        this.reservationText_Title = "Czy na pewno chcesz zarezerwować: ";
        this.reservationText_Service = this.currentService.name;

        const day = String(this.selectedDate.getDate()).padStart(2, '0');
        const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
        const year = String(this.selectedDate.getFullYear());

        this.reservationText_Date = "dnia " + day + "." + month + "." + year;
        this.reservationText_Time = "w godzinach: " + this.timeFormat(this.datesWithSameDate[this.selectedReservationTime]) + "?";

        this.confirmReservationPopup.open();
      }
    }
  }

  public confirmReservation(): void {
    this.confirmReservationPopup.close();

    if (this.currentService && this.selectedDate) {
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

      if (this.selectedReservationTime != undefined) {
        const stime = this.datesWithSameDate[this.selectedReservationTime].startTime;
        if (stime != undefined && stime != null) {
          this.serviceReservation.start_time = stime;
        }
        const etime = this.datesWithSameDate[this.selectedReservationTime].endTime;
        if (etime) {
          this.serviceReservation.end_time = etime;
        }
      }
      
      this.serviceReservationsService.addServiceReservation(this.serviceReservation).subscribe(observer);

      this.datesWithSameDate = [];
    }
  }

  dateFilter: DateFilterFn<Date | null> = (date: Date | null) => {
    if (!date) {
      return false;
    }
  
    const selectedDate = new Date(date);

    let availableDates = [];
    let newAvailableDates = [];
  
    // Check if there is any availability for the selected date
    for (const availableDate of this.availableDatesList) {
      if (isSameDay(selectedDate, availableDate.date)) {
        availableDates.push(availableDate);
      }
    }

    if (availableDates.length == 0) {
      return false;
    }

    // Check if the selected date is in the unavailableDatesList
    for (const availableDate of availableDates) {
      let available = true;
      for (const unavailableDate of this.unavailableDatesList) {
        if (isSameDay(availableDate.date, unavailableDate.date)
          && unavailableDate.startTime && unavailableDate.endTime
          && availableDate.startTime && availableDate.endTime
        ) {
          const unavailStartTime = convertStringDatetime(unavailableDate.date, unavailableDate.startTime);
          const unavailEndTime = convertStringDatetime(unavailableDate.date, unavailableDate.endTime);
          
          const availStartTime = convertStringDatetime(availableDate.date, availableDate.startTime);
          const availEndTime = convertStringDatetime(availableDate.date, availableDate.endTime);

          if(unavailStartTime.getTime() <= availStartTime.getTime() && unavailEndTime.getTime() >= availEndTime.getTime()) {
            available = false;
            break;
          }
        }
      }
      if(available) {
        newAvailableDates.push(availableDate);
      }
    }
  
    return newAvailableDates.length > 0 ? true : false;
  };
}
