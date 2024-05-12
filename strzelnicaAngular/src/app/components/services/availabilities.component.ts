import { ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { PaginationComponent } from '../pagination.component';
import { Service } from '../../interfaces/service';
import { ServicesService } from '../../services/services.service';
import { Observer } from 'rxjs';
import { ServiceAvailability } from '../../interfaces/serviceavailability';
import { ServiceAvailabilitiesService } from '../../services/serviceavailabilities.service';
import { ServiceUnavailabilitiesService } from '../../services/serviceunavailabilities.service';
import { ServiceUnavailability } from '../../interfaces/serviceunavailability';
import { getFormattedDate, getFormattedTime, getPolishDayOfWeek } from '../../utils/utils';

@Component({
  selector: 'app-availabilities',
  templateUrl: './availabilities.component.html',
  styleUrls: [
    // Style for this component
    '/src/app/styles/reservations.component.css',
    // Styles shared between all the list components
    '/src/app/styles/shared-list-styles.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css'
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

  constructor(
    private servicesService: ServicesService,
    private availabilitiesService: ServiceAvailabilitiesService,
    private unavailabilitiesService: ServiceUnavailabilitiesService,
    private cd: ChangeDetectorRef
  ) {}

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
}