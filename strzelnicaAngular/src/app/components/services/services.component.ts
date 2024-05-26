import { AfterViewInit, Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PopupComponent } from '../popup.component';
import { DateFilterFn } from '@angular/material/datepicker';
import { Service } from '../../interfaces/service';
import { ServicesService } from '../../services/services.service';
import { PaginationComponent } from '../pagination.component';
import { isImageValid, formatTrack } from '../../utils/utils';
import { Observer } from 'rxjs';
import { ServiceReservation } from '../../interfaces/servicereservation';
import { AvailabilityService } from '../../services/availability.service';
import { DateAvailability } from '../../interfaces/dateavailability';
import { ServiceReservationsService } from '../../services/servicereservations.service';
import { Track } from '../../interfaces/track';

@Component({
  selector: 'app-service-reservation',
  templateUrl: './services.component.html',
  styleUrls: [
    '/src/app/styles/service.component.css',
    '/src/app/styles/shared-list-styles.css',
    '/src/app/styles/shared-button-styles.css',
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
  public confirmButtonClass: string = "button-confirm-disabled";
  public reservationText_Title: string = "";
  public reservationText_Service: string = "";
  public reservationText_Date: string = "";
  public reservationText_Time: string = "";
  public reservationText_Track: string = "";
  formatTrack = formatTrack;

  currentService?: Service;
  serviceList: Service[] = [];

  availableDatesList: DateAvailability[] = [];
  datesWithSameDate: DateAvailability[] = [];
  selectedDate: Date | null = null;

  trackList: Track[] = [];

  selectedReservationTime?: number;
  selectedTrack?: number;
  
  serviceReservation: ServiceReservation = {
    service: undefined,
    date: new Date(),
    startTime: "",
    end_time: "",
    price: -1,
    track: undefined,
  };

  constructor(
    private servicesService: ServicesService,
    private availabilityService: AvailabilityService,
    private serviceReservationsService: ServiceReservationsService,
    private cd: ChangeDetectorRef
  ) {
    this.minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    this.maxDate = maxDate;
  }

  ngAfterViewInit(): void {
    this.fetchServices();
    this.cd.detectChanges();
  }

  public selectTrack(num: number): void {
    if (this.selectedTrack == num) {
      this.selectedTrack = undefined;
      this.confirmButtonClass = "button-confirm-disabled";

    } else {
      this.selectedTrack = num;
      this.confirmButtonClass = "button-confirm";
    }
  }

  fetchServices(): void {
    this.servicesService.getPaginatedServices(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(services => {
      this.paginationComponent.totalPages = services.totalPages;
      this.paginationComponent.calculatePages();

      services.content.forEach((item: { content: string | null | undefined; picture: string; }) => {
          if (!isImageValid(item.picture)) {
            item.picture = '';
          }
      });
      this.serviceList = services.content;
    });
  }

  fetchAvailabilities(id: number): void {
    this.availabilityService.getAvailabilitiesByServiceId(id).subscribe(availabilities => {
      availabilities.forEach((avaialbility: DateAvailability) => {
        this.availableDatesList.push(avaialbility);
      });
    });
  }

  public selectReservationTime(num: number): void {
    if (this.selectedReservationTime == num) {
      this.selectedReservationTime = undefined;
      this.confirmButtonClass = "button-confirm-disabled";
      this.selectedTrack = undefined;

    } else {
      this.selectedReservationTime = num;

      this.trackList = [];
      this.availableDatesList.forEach(dateAvail => {
        if (dateAvail.track != undefined && this.selectedDate && new Date(dateAvail.date).getDate() === this.selectedDate.getDate()) {
          this.trackList.push(dateAvail.track);
        }
      });
    }
  }

  // Inside the ServicesComponent class
  public onDateChange(): void {
    this.trackList = [];
    this.selectedTrack = undefined;
    this.confirmButtonClass = "button-confirm-disabled";
    this.selectedReservationTime = undefined;
    this.datesWithSameDate = [];

    this.availableDatesList.forEach(dateAvail => {
      if (dateAvail.date != null && this.selectedDate != null) {
        if (new Date(dateAvail.date).getDate() === this.selectedDate.getDate()) {
          // filter if there already is one with the same time
          if (!this.datesWithSameDate.some(date => date.startTime === dateAvail.startTime && date.endTime === dateAvail.endTime)) {
            this.datesWithSameDate.push(dateAvail);
          }
        }
      }
    });
  }

  public dateFilter: DateFilterFn<Date | null> = (date: Date | null): boolean => {
    if (date === null) { return false; }
    return this.availabilityService.isDateAvailable(date, this.availableDatesList);
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

  public openReservingPopup(service: Service): void {
    this.trackList = [];
    this.selectedTrack = undefined;

    this.availableDatesList = [];
    this.datesWithSameDate = [];
    this.selectedDate = null;

    this.currentService = service;
    this.fetchAvailabilities(service.id);
    this.reservationPopup.open();
  }

  public reservationPopupConfirmAction(): void {
    if (this.selectedReservationTime != undefined) {
      this.reservationPopup.close();

      if (this.currentService && this.selectedDate && this.selectedTrack != undefined) {
        this.reservationText_Title = "Czy na pewno chcesz zarezerwować: ";
        this.reservationText_Service = this.currentService.name;

        const day = String(this.selectedDate.getDate()).padStart(2, '0');
        const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
        const year = String(this.selectedDate.getFullYear());

        const track = this.trackList[this.selectedTrack].type.name + " nr. " +  this.trackList[this.selectedTrack].id;

        this.reservationText_Date = "dnia " + day + "." + month + "." + year;
        this.reservationText_Time = "w godzinach: " + this.timeFormat(this.datesWithSameDate[this.selectedReservationTime]);
        this.reservationText_Track = "na torze: " + track + "?";

        this.confirmReservationPopup.open();
      }
    }
  }

  public confirmReservation(): void {
    this.confirmReservationPopup.close();

    if (this.currentService && this.selectedDate && this.selectedTrack != undefined) {
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

      this.serviceReservation.service = this.currentService;
      this.serviceReservation.price = this.currentService.price;
      this.serviceReservation.date = this.selectedDate;
      this.serviceReservation.track = this.trackList[this.selectedTrack];

      if (this.selectedReservationTime != undefined) {
        const stime = this.datesWithSameDate[this.selectedReservationTime].startTime;
        if (stime != undefined && stime != null) {
          this.serviceReservation.startTime = stime;
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
}
