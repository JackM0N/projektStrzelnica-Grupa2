import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { PaginationComponent } from '../pagination.component';
import { Service } from '../../interfaces/service';
import { ServicesService } from '../../services/services.service';
import { ServiceReservationsService } from '../../services/servicereservations.service';
import { ServiceReservation } from '../../interfaces/servicereservation';
import { Observer } from 'rxjs';
import { isPastDate, getFormattedTime, getFormattedDate, formatDateForInput, formatTrack } from '../../utils/utils';
import { PopupComponent } from '../popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Track } from '../../interfaces/track';
import { TracksService } from '../../services/tracks.service';

@Component({
  selector: 'app-offers',
  templateUrl: './reservations.component.html',
  styleUrls: [
    // Style for this component
    '/src/app/styles/reservations.component.css',
    // Styles shared between all the list components
    '/src/app/styles/shared-list-styles.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css',
    // Shared form styles
    '/src/app/styles/shared-form-styles.css'
  ]
})
export class ReservationsComponent implements AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  public serviceList: Service[] = [];
  public reservationList: ServiceReservation[] = [];
  public trackList: Track[] = [];
  public selectedService?: Service;
  isPastDate = isPastDate;
  getFormattedTime = getFormattedTime;
  getFormattedDate = getFormattedDate;
  formatDateForInput = formatDateForInput;
  formatTrack = formatTrack;

  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader: string = "";
  public responsePopupMessage: string = "";
  public responsePopupNgClass = '';

  @ViewChild('confirmDeletionPopup') confirmDeletionPopup!: PopupComponent;
  public confirmDeletionPopupHeader = '';
  public confirmDeletionPopupMessage = '';
  public confirmDeletionPopupConfirmText = '';
  public confirmDeletionPopupConfirmNgClass = '';
  public selectedReservation?: ServiceReservation;

  @ViewChild('formPopup') formPopup!: PopupComponent;
  @ViewChild('dateInput') dateInput?: ElementRef;
  reservationForm: FormGroup;

  reservation: ServiceReservation = {
    service: undefined,
    date: new Date(),
    start_time: '',
    end_time: '',
    price: -1,
    track: undefined,
  };

  constructor(
    private servicesService: ServicesService,
    private reservationsService: ServiceReservationsService,
    private tracksService: TracksService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {
    this.reservationForm = this.formBuilder.group({
      service: [undefined, Validators.required],
      date: [new Date(), Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      price: ['', Validators.required],
      track: [undefined, Validators.required],
    });
  }

  // After init - because we need the pagination to load first
  // Fetch users from the database and display them
  ngAfterViewInit(): void {
    this.fetchServices();

    // The DOM has been changed, we need to detect the changes to prevent ExpressionChangedAfterItHasBeenCheckedError
    this.cd.detectChanges();
  }

  selectService(service: Service): void {
    if(this.selectedService == service) {
      this.selectedService = undefined;
      this.reservationList = [];
      this.paginationComponent.totalPages = 0;
      this.paginationComponent.calculatePages();

    } else {
      this.selectedService = service;
      this.fetchReservations(service.id);
    }
  }

  fetchServices(): void {
    this.servicesService.getAllServices().subscribe(services => {
      this.serviceList = services;
    });
  }

  compareServices(a: Service, b: Service): boolean {
    return a && b ? a.id === b.id : a === b;
  }

  fetchReservations(id: number): void {
    const observer: Observer<any> = {
      next: response => {
        this.reservationList = response.content;
        this.paginationComponent.totalPages = response.totalPages;
        this.paginationComponent.calculatePages();
      },
      error: error => {
        this.reservationList = [];
      },
      complete: () => {}
    };

    this.reservationsService.getPaginatedServiceReservationsByServiceId(id, this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(observer);
  }

  // Fetch all available tracks
  fetchTracks(): void {
    const observer: Observer<any> = {
      next: response => {
        this.trackList = [];
        response.forEach((track: Track) => {
          this.trackList.push(track);
        });
      },
      error: error => {
        this.trackList = [];
      },
      complete: function (): void {}
    };

    this.tracksService.getAllTracks().subscribe(observer);
  }

  openPopupForm(reservation: ServiceReservation): void {
    this.fetchTracks();

    this.reservation = reservation;
    this.reservation.track = reservation.track;

    this.formPopup.open();
  }

  compareTracks(a: Track, b: Track): boolean {
    return a && b ? a.id === b.id : a === b;
  }

  submitForm(): void {
    if (this.reservationForm.valid) {
      this.reservation.service = this.reservationForm.value.service;
      this.reservation.start_time = this.reservationForm.value.start_time;
      this.reservation.end_time = this.reservationForm.value.end_time;
      this.reservation.price = this.reservationForm.value.price;

      const selectedTrack: Track = this.reservationForm.value.track;
      this.reservation.track = selectedTrack;

      // Get the date value directly from the component to avoid problems
      if(this.dateInput != undefined) {
        const inputValue = this.dateInput.nativeElement.value;
        this.reservation.date = inputValue;
      }
      
      this.formPopup.close();

      const observer: Observer<any> = {
        next: response => {
          this.responsePopupHeader = 'Pomyślnie zaktualizowano rezerwacje o numerze ' + this.reservation.id + '.';
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: error => {
          this.responsePopupHeader = 'Przy aktualizacji napotkano błąd.';
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
          this.responsePopup.open();
        },
        complete: () => {}
      };
      this.reservationsService.updateServiceReservation(this.reservation).subscribe(observer);

    }
  }

  closeForm(): void {
    this.formPopup.close();
  }

  confirmDelete(reservation: ServiceReservation): void {
    this.confirmDeletionPopupHeader = 'Czy na pewno chcesz usunąć rezerwację o numerze ' + reservation.id + '?';
    this.confirmDeletionPopupConfirmText = "Usuń";
    this.confirmDeletionPopupConfirmNgClass = "button-delete";
    this.confirmDeletionPopup.open();
    this.selectedReservation = reservation;
  }

  confirmDeletionAction(): void {
    if (this.selectedReservation && this.selectedReservation.id) {

      const observer: Observer<any> = {
        next: response => {
          this.responsePopupHeader = 'Pomyślnie usunięto rezerwację.';
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: error => {
          this.responsePopupHeader = 'Przy usuwaniu napotkano błąd.';
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
          this.responsePopup.open();
        },
        complete: () => {}
      };
  
      this.reservationsService.deleteServiceReservation(this.selectedReservation.id).subscribe(observer);
    }
  }

  public responsePopupCancelAction(): void {
    window.location.reload();
  }
}
