import { ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { PaginationComponent } from '../pagination.component';
import { Service } from '../../interfaces/service';
import { ServicesService } from '../../services/services.service';
import { Observer } from 'rxjs';
import { ServiceAvailability } from '../../interfaces/serviceavailability';
import { ServiceAvailabilitiesService } from '../../services/serviceavailabilities.service';
import { ServiceUnavailabilitiesService } from '../../services/serviceunavailabilities.service';
import { ServiceUnavailability } from '../../interfaces/serviceunavailability';
import { getFormattedDate, getFormattedTime, getPolishDayOfWeek, formatDateForInput } from '../../utils/utils';
import { PopupComponent } from '../popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-availabilities',
  templateUrl: './availabilities.component.html',
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
export class AvailabilitiesComponent {
  @ViewChild('paginationComponent1', { static: false }) paginationComponent1!: PaginationComponent;
  @ViewChild('paginationComponent2', { static: false }) paginationComponent2!: PaginationComponent;
  serviceList: Service[] = [];
  availabilitiesList: ServiceAvailability[] = [];
  unavailabilitiesList: ServiceUnavailability[] = [];
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
  public selectedUnavailability?: ServiceUnavailability;

  @ViewChild('availabilityFormPopup') availabilityFormPopup!: PopupComponent;
  availabilityForm: FormGroup;
  @ViewChild('av_startDateInput') av_startDateInput?: ElementRef;
  @ViewChild('av_endDateInput') av_endDateInput?: ElementRef;
  @ViewChild('av_serviceDayInput') av_serviceDayInput?: ElementRef;
  
  @ViewChild('unavailabilityFormPopup') unavailabilityFormPopup!: PopupComponent;
  unavailabilityForm: FormGroup;
  @ViewChild('un_startDateInput') un_startDateInput?: ElementRef;
  @ViewChild('un_endDateInput') un_endDateInput?: ElementRef;

  availability: ServiceAvailability = {
    service_id: -1,
    start_date: new Date(),
    end_date: new Date(),
    service_day: new Date(),
    service_time_start: '',
    service_time_end: ''
  };

  unavailability: ServiceUnavailability = {
    service_id: -1,
    start_date: new Date(),
    start_time: '',
    end_date: new Date(),
    end_time: ''
  };

  resetModels(): void {
    this.availability = {
      service_id: -1,
      start_date: new Date(),
      end_date: new Date(),
      service_day: new Date(),
      service_time_start: '',
      service_time_end: ''
    };
  
    this.unavailability = {
      service_id: -1,
      start_date: new Date(),
      start_time: '',
      end_date: new Date(),
      end_time: ''
    };
  }

  constructor(
    private servicesService: ServicesService,
    private availabilitiesService: ServiceAvailabilitiesService,
    private unavailabilitiesService: ServiceUnavailabilitiesService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {
    this.availabilityForm = this.formBuilder.group({
      service_id: ['', Validators.required],
      start_date: [undefined, Validators.required],
      end_date: [undefined, Validators.required],
      service_day: [undefined, Validators.required],
      service_time_start: ['', Validators.required],
      service_time_end: ['', Validators.required]
    });
    
    this.unavailabilityForm = this.formBuilder.group({
      service_id: ['', Validators.required],
      start_date: [undefined, Validators.required],
      start_time: ['', Validators.required],
      end_date: [undefined, Validators.required],
      end_time: ['', Validators.required],
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
      this.availabilitiesList = [];

      this.paginationComponent1.totalPages = 0;
      this.paginationComponent1.calculatePages();

      this.unavailabilitiesList = [];
      this.paginationComponent2.totalPages = 0;
      this.paginationComponent2.calculatePages();

    } else {
      this.selectedService = service;
      this.fetchAvailabilities(service.id);
      this.fetchUnavailabilities(service.id);
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
    if(this.selectedService != undefined) {
      this.fetchAvailabilities(this.selectedService.id);
    }
  }

  getNewUnavailabilities(): void {
    if(this.selectedService != undefined) {
      this.fetchUnavailabilities(this.selectedService.id);
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

  fetchUnavailabilities(id: number): void {
    const observer: Observer<any> = {
      next: response => {
        this.unavailabilitiesList = response.content;
        this.paginationComponent2.totalPages = response.totalPages;
        this.paginationComponent2.calculatePages();
      },
      error: error => {
        this.unavailabilitiesList = [];
      },
      complete: () => {}
    };

    this.unavailabilitiesService.getPaginatedServiceUnavailabilitiesByServiceId(id, this.paginationComponent2.currentPage, this.paginationComponent2.maxItems).subscribe(observer);
  }

  confirmDeletion(): void {
    this.confirmDeletionPopupHeader = 'Czy na pewno chcesz usunąć termin o numerze'
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
  confirmDeleteUnavailability(unavailability: ServiceUnavailability): void {
    this.confirmDeletion();
    this.isSelectedAvailability = false;
    this.confirmDeletionPopupHeader += unavailability.id + '?';
    this.selectedUnavailability = unavailability;
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
    } else {
      if (this.selectedUnavailability && this.selectedUnavailability.id) {
        this.unavailabilitiesService.deleteServiceUnavailability(this.selectedUnavailability.id).subscribe(observer);
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

    return observer
  }

  submitFormAvailability(): void {
    if (this.availabilityForm.valid) {
      this.availability.service_id = this.availabilityForm.value.service_id;
      this.availability.start_date = this.availabilityForm.value.start_date;
      this.availability.end_date = this.availabilityForm.value.end_date;
      this.availability.service_day = this.availabilityForm.value.service_day;
      this.availability.service_time_start = this.availabilityForm.value.service_time_start;
      this.availability.service_time_end = this.availabilityForm.value.service_time_end;

      // Get the date value directly from the component to avoid problems
      if (this.av_startDateInput != undefined) {
        const inputValue = this.av_startDateInput.nativeElement.value;
        this.availability.start_date = inputValue;
      }
      if (this.av_endDateInput != undefined) {
        const inputValue = this.av_endDateInput.nativeElement.value;
        this.availability.end_date = inputValue;
      }
      if (this.av_serviceDayInput != undefined) {
        const inputValue = this.av_serviceDayInput.nativeElement.value;
        this.availability.service_day = inputValue;
      }

      this.availabilityFormPopup.close();

      const observer = this.submitForm();

      this.availabilitiesService.updateServiceAvailability(this.availability).subscribe(observer);
    }
  }

  submitFormUnavailability(): void {
    if (this.unavailabilityForm.valid) {
      this.unavailability.service_id = this.unavailabilityForm.value.service_id;
      this.unavailability.start_date = this.unavailabilityForm.value.start_date;
      this.unavailability.start_time = this.unavailabilityForm.value.start_time;
      this.unavailability.end_date = this.unavailabilityForm.value.end_date;
      this.unavailability.end_time = this.unavailabilityForm.value.end_time;

      // Get the date value directly from the component to avoid problems
      if (this.un_startDateInput != undefined) {
        const inputValue = this.un_startDateInput.nativeElement.value;
        this.unavailability.start_date = inputValue;
      }

      if (this.un_endDateInput != undefined) {
        const inputValue = this.un_endDateInput.nativeElement.value;
        this.unavailability.end_date = inputValue;
      }

      console.log(this.unavailability);

      this.unavailabilityFormPopup.close();

      const observer = this.submitForm();

      this.unavailabilitiesService.updateServiceUnavailability(this.unavailability).subscribe(observer);
    }
  }

  openAvailabilityForm(availability: ServiceAvailability): void {
    this.availability = availability;
    if (this.selectedService) {
      this.availability.service_id = this.selectedService.id;
    }
    this.availabilityFormPopup.open();
  }

  openUnavailabilityForm(unavailability: ServiceUnavailability): void {
    this.unavailability = unavailability;
    if (this.selectedService) {
      this.unavailability.service_id = this.selectedService.id;
    }
    this.unavailabilityFormPopup.open();
  }

  openAvailabilityAddForm(): void {
    this.resetModels();
    if (this.selectedService) {
      this.availability.service_id = this.selectedService.id;
    }
    this.availabilityFormPopup.open();
  }

  openUnavailabilityAddForm(): void {
    this.resetModels();
    if (this.selectedService) {
      this.unavailability.service_id = this.selectedService.id;
    }
    this.unavailabilityFormPopup.open();
  }

  closeAvailabilityForm(): void {
    this.availabilityFormPopup.close();
  }

  closeUnavailabilityForm(): void {
    this.unavailabilityFormPopup.close();
  }

  public responsePopupCancelAction(): void {
    window.location.reload();
  }
}
