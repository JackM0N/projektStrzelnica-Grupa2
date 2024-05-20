import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { PaginationComponent } from '../pagination.component';
import { Service } from '../../interfaces/service';
import { ServicesService } from '../../services/services.service';
import { Observer } from 'rxjs';
import { ServiceAvailability } from '../../interfaces/serviceavailability';
import { ServiceAvailabilitiesService } from '../../services/serviceavailabilities.service';
import { getFormattedDate, getFormattedTime, getPolishDayOfWeek, formatDateForInput } from '../../utils/utils';
import { PopupComponent } from '../popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-availabilities',
  templateUrl: './availabilities.component.html',
  styleUrls: [
    '/src/app/styles/reservations.component.css',
    '/src/app/styles/shared-list-styles.css',
    '/src/app/styles/shared-button-styles.css',
    '/src/app/styles/shared-form-styles.css'
  ]
})
export class AvailabilitiesComponent {
  @ViewChild('paginationComponent1', { static: false }) paginationComponent1!: PaginationComponent;
  @ViewChild('paginationComponent2', { static: false }) paginationComponent2!: PaginationComponent;
  serviceList: Service[] = [];
  availabilitiesList: ServiceAvailability[] = [];
  selectedService?: Service;
  getFormattedDate = getFormattedDate;
  getFormattedTime = getFormattedTime;
  getPolishDayOfWeek = getPolishDayOfWeek;
  formatDateForInput = formatDateForInput;

  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader: string = "";
  public responsePopupMessage: string = "";
  public responsePopupNgClass = '';

  @ViewChild('confirmDeletionPopup') confirmDeletionPopup!: PopupComponent;
  public confirmDeletionPopupHeader = '';
  public confirmDeletionPopupMessage = '';
  public confirmDeletionPopupConfirmText = '';
  public confirmDeletionPopupConfirmNgClass = '';
  public isSelectedAvailability = false;
  public selectedAvailability?: ServiceAvailability;

  @ViewChild('availabilityFormPopup') availabilityFormPopup!: PopupComponent;
  availabilityForm: FormGroup;
  @ViewChild('av_startDateInput') av_startDateInput?: ElementRef;
  @ViewChild('av_endDateInput') av_endDateInput?: ElementRef;
  @ViewChild('av_serviceDayInput') av_serviceDayInput?: ElementRef;
  avilabilityAdding: boolean = false;

  availability: ServiceAvailability = {
    service: undefined,
    start_date: new Date(),
    end_date: new Date(),
    service_day: new Date(),
    service_time_start: '',
    service_time_end: ''
  };

  resetModels(): void {
    this.availability = {
      service: undefined,
      start_date: new Date(),
      end_date: new Date(),
      service_day: new Date(),
      service_time_start: '',
      service_time_end: ''
    };
  }

  constructor(
    private servicesService: ServicesService,
    private availabilitiesService: ServiceAvailabilitiesService,
    private cd: ChangeDetectorRef,
    private availabilityFormBuilder: FormBuilder,
  ) {
    this.availabilityForm = this.availabilityFormBuilder.group({
      service: [undefined, Validators.required],
      start_date: [new Date(), Validators.required],
      end_date: [new Date(), Validators.required],
      service_day: [new Date(), Validators.required],
      service_time_start: ['', Validators.required],
      service_time_end: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.fetchServices();
    this.cd.detectChanges();
  }

  selectService(service: Service): void {
    if(this.selectedService === service) {
      this.selectedService = undefined;
      this.availabilitiesList = [];
      this.paginationComponent1.totalPages = 0;
      this.paginationComponent1.calculatePages();
      this.paginationComponent2.totalPages = 0;
      this.paginationComponent2.calculatePages();
    } else {
      this.selectedService = service;
      this.fetchAvailabilities(service.id);
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

  getNewAvailabilities(): void {
    if(this.selectedService !== undefined) {
      this.fetchAvailabilities(this.selectedService.id);
    }
  }

  fetchAvailabilities(id: number): void {
    const observer: Observer<any> = {
      next: response => {
        this.availabilitiesList = response.content;
        this.paginationComponent1.totalPages = response.totalPages;
        this.paginationComponent1.calculatePages();
      },
      error: error => {
        this.availabilitiesList = [];
      },
      complete: () => {}
    };

    this.availabilitiesService.getPaginatedServiceAvailabilitiesByServiceId(id, this.paginationComponent1.currentPage, this.paginationComponent1.maxItems).subscribe(observer);
  }

  confirmDeletion(): void {
    this.confirmDeletionPopupHeader = 'Czy na pewno chcesz usunąć termin o numerze';
    this.confirmDeletionPopupConfirmText = "Usuń";
    this.confirmDeletionPopupConfirmNgClass = "button-delete";
    this.confirmDeletionPopup.open();
  }

  confirmDeleteAvailability(availability: ServiceAvailability): void {
    this.confirmDeletion();
    this.isSelectedAvailability = true;
    this.confirmDeletionPopupHeader += availability.id + '?';
    this.selectedAvailability = availability;
  }

  confirmDeletionAction(): void {
    const observer: Observer<any> = {
      next: response => {
        this.responsePopupHeader = 'Pomyślnie usunięto termin.';
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

    if (this.isSelectedAvailability) {
      if (this.selectedAvailability && this.selectedAvailability.id) {
        this.availabilitiesService.deleteServiceAvailability(this.selectedAvailability.id).subscribe(observer);
      }
    }
  }

  submitForm(): Observer<any> {
    const observer: Observer<any> = {
      next: response => {
        this.responsePopupHeader = 'Pomyślnie zaktualizowano termin.';
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

    return observer;
  }

  submitFormAvailability(): void {
    if (this.availabilityForm.valid) {
      this.availability.service = this.availabilityForm.value.service;
      this.availability.start_date = this.availabilityForm.value.start_date;
      this.availability.end_date = this.availabilityForm.value.end_date;
      this.availability.service_day = this.availabilityForm.value.service_day;
      this.availability.service_time_start = this.availabilityForm.value.service_time_start;
      this.availability.service_time_end = this.availabilityForm.value.service_time_end;

      // Get the date value directly from the component to avoid problems
      if (this.av_startDateInput != undefined) {
        const inputValue = this.av_startDateInput.nativeElement.value;
        this.availability.start_date = inputValue;
        console.log("set start date: " + inputValue);
      }

      if (this.av_endDateInput != undefined) {
        const inputValue = this.av_endDateInput.nativeElement.value;
        this.availability.end_date = inputValue;
        console.log("set end date: " + inputValue);
      }

      if (this.av_serviceDayInput != undefined) {
        const inputValue = this.av_serviceDayInput.nativeElement.value;
        this.availability.service_day = inputValue;
        console.log("set service day: " + inputValue);
      }

      console.log(this.availability);

      this.availabilityFormPopup.close();
      const observer = this.submitForm();

      if (this.avilabilityAdding) {
        this.availabilitiesService.addServiceAvailability(this.availability).subscribe(observer);
      } else {
        this.availabilitiesService.updateServiceAvailability(this.availability).subscribe(observer);
      }
    }
  }

  openAvailabilityForm(availability: ServiceAvailability): void {
    this.avilabilityAdding = false;

    this.availability = availability;
    if (this.selectedService) {
      this.availability.service = this.selectedService;
    }

    this.availabilityFormPopup.open();
  }

  openAvailabilityAddForm(): void {
    this.avilabilityAdding = true;

    this.resetModels();
    if (this.selectedService) {
      this.availability.service = this.selectedService;
    }
    this.availabilityFormPopup.open();
  }

  closeAvailabilityForm(): void {
    this.availabilityFormPopup.close();
  }

  public responsePopupCancelAction(): void {
    window.location.reload();
  }
}
