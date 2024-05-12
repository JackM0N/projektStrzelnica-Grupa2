import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../interfaces/service';
import { ServicesService } from '../../services/services.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from '../popup.component';
import { Observer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-service',
  templateUrl: './serviceform.component.html',
  styleUrls: [
    // Shared button styles
    '/src/app/styles/shared-button-styles.css',
    // Shared form styles
    '/src/app/styles/shared-form-styles.css'
  ]
})

// Component for adding or editing services
export class ServiceFormComponent implements OnInit {
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
  serviceForm: FormGroup;

  isAddServiceRoute: boolean;
  serviceId: number = 0;
  actionText = 'Dodaj nową usługę';

  service: Service = {
    id: 0,
    name: '',
    description: '',
    image_url: ''
  };


  constructor (
    private location: Location,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private formBuilder: FormBuilder,
  ) {
    this.isAddServiceRoute = this.route.snapshot.routeConfig?.path?.includes('/add') == true;
    if(!this.isAddServiceRoute) {
      this.actionText = 'Edytuj usługę';
    }

    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image_url: ['']
    });
  }

  // On init, if there is an id in the page URL, fetch the service with that id and display it
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.serviceId = + params['id'];
        this.servicesService.getServiceById(this.serviceId).subscribe((service: Service) => {
          this.service = service;
        });
      }
    });
  }

  // On submit, user clicks to confirm adding/editing the service, complete it with the database
  onSubmit() {
    if (this.serviceForm.valid) {
      this.service.name = this.serviceForm.value.name;
      this.service.description = this.serviceForm.value.description;
      this.service.image_url = this.serviceForm.value.image_url;

      const observer: Observer<any> = {
        next: response => {
          if (this.isAddServiceRoute) {
            this.responsePopupHeader = 'Pomyślnie dodano usługę ' + this.service.name + '.';
          } else {
            this.responsePopupHeader = 'Pomyślnie zaktualizowano usługę ' + this.service.name + '.';
          }
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: error => {
          if (this.isAddServiceRoute) {
            this.responsePopupHeader = 'Przy dodawaniu napotkano błąd.';
          } else {
            this.responsePopupHeader = 'Przy aktualizacji napotkano błąd.';
          }
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
          this.responsePopup.open();
        },
        complete: () => {}
      };

      // Subscribe using the observer object
      if (this.isAddServiceRoute) {
        this.servicesService.addService(this.service).subscribe(observer);
      } else {
        this.servicesService.updateService(this.service).subscribe(observer);
      }
    }
  }
  
  // Open the main page after the user clicks on the response pop-up
  public responsePopupCancelAction(): void {
    this.location.back();
  }
  
  // User clicks go back from the form page
  public goBack(): void {
    this.location.back();
  }
}
