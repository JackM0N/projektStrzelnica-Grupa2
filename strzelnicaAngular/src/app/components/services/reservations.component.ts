import { ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { PaginationComponent } from '../pagination.component';
import { Service } from '../../interfaces/service';
import { ServicesService } from '../../services/services.service';
import { ServiceReservationsService } from '../../services/servicereservations.service';
import { ServiceReservation } from '../../interfaces/servicereservation';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './reservations.component.html',
  styleUrls: [
    // Style for this component
    '/src/app/styles/reservations.component.css',
    // Styles shared between all the list components
    '/src/app/styles/shared-list-styles.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css'
  ]
})
export class ReservationsComponent {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  serviceList: Service[] = [];
  reservationList: ServiceReservation[] = [];
  selectedService?: Service;

  constructor(
    private servicesService: ServicesService,
    private reservationsService: ServiceReservationsService,
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
}