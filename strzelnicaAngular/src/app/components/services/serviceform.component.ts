import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../interfaces/service';
import { ServicesService } from '../../services/services.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from '../popup.component';
import { Observer } from 'rxjs';
import { Location } from '@angular/common';
import { TracktypesService } from '../../services/tracktypes.service';
import { Tracktype } from '../../interfaces/tracktype';

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
  public tracktypeList: any[] = [];
  serviceForm: FormGroup;

  isAddServiceRoute: boolean;
  serviceId: number = 0;
  actionText = 'Dodaj nową usługę';

  service: Service = {
    id: 0,
    name: '',
    description: '',
    image_url: '',
    price: 0,
    tracktype: undefined
  };

  quillToolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //[{ 'direction': 'rtl' }],                         // text direction

    //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  constructor (
    private location: Location,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private tracktypesService: TracktypesService,
    private formBuilder: FormBuilder,
  ) {
    this.isAddServiceRoute = this.route.snapshot.routeConfig?.path?.includes('/add') == true;
    if(!this.isAddServiceRoute) {
      this.actionText = 'Edytuj usługę';
    }

    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image_url: [''],
      price: ['', Validators.required],
      tracktype: [undefined, Validators.required]
    });
  }

  // On init, if there is an id in the page URL, fetch the service with that id and display it
  ngOnInit() {
    this.fetchTracktypes();

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
      this.service.price = this.serviceForm.value.price;
      this.service.tracktype = this.serviceForm.value.tracktype;

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
  
  // Fetch all available tracks
  fetchTracktypes(): void {
    const observer: Observer<any> = {
      next: response => {
        this.tracktypeList = [];
        response.forEach((track: Tracktype) => {
          this.tracktypeList.push(track);
        });
      },
      error: error => {
        this.tracktypeList = [];
      },
      complete: function (): void {}
    };

    this.tracktypesService.getAllTracktypes().subscribe(observer);
  }

  compareTracktypes(a: Tracktype, b: Tracktype): boolean {
    return a && b ? a.id === b.id : a === b;
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
