import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PopupComponent } from '../popup.component';
import { Observer } from 'rxjs';
import { Weapon } from '../../interfaces/weapon';
import { WeaponService } from '../../services/weapon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-weapon',
  templateUrl: './weaponform.component.html',
  styleUrls: [
    // Style exclusive for this component
    '/src/app/styles/weaponform.component.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css',
    // Shared form styles
    '/src/app/styles/shared-form-styles.css'
  ]
})

// Component for adding or editing weapons
export class WeaponFormComponent implements OnInit {
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
  weaponForm: FormGroup;
  
  isAddWeaponRoute: boolean;
  weaponId: number = 0;
  actionText = 'Dodaj nową broń';

  weapon: Weapon = {
    name: '',
    usesSinceLastMaintenance: 0,
    maintenanceEvery: 0,
    fitForUse: false,
    pricePerHour: 0,
    inMaintenance: false,
    serialNumber: '',
  };

  // Constructor, determine whether we are adding or editing a weapon
  constructor (
    private location: Location,
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private formBuilder: FormBuilder,
  ) {
    this.isAddWeaponRoute = this.route.snapshot.routeConfig?.path?.includes('/add') == true;
    if(!this.isAddWeaponRoute) {
      this.actionText = 'Edytuj broń';
    }

    this.weaponForm = this.formBuilder.group({
      name: ['', Validators.required],
      usesSinceLastMaintenance: ['', Validators.required],
      maintenanceEvery: ['', Validators.required],
      fitForUse: [false, Validators.required],
      pricePerHour: ['', Validators.required],
      inMaintenance: [false, Validators.required],
      serialNumber: ['', Validators.required],
    });
  }

  // On init, if there is an id in the page URL, fetch the weapon with that id and display it
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.weaponId = +params['id'];
        this.weaponService.getWeaponById(this.weaponId).subscribe((weapon: Weapon) => {
          this.weapon = weapon;
        });
      }
    });
  }

  // On submit, user clicks to confirm adding/editing a weapon, complete it with the database
  onSubmit() {
    if (this.weaponForm.valid) {
      this.weapon.name = this.weaponForm.value.name;
      this.weapon.usesSinceLastMaintenance = this.weaponForm.value.usesSinceLastMaintenance;
      this.weapon.maintenanceEvery = this.weaponForm.value.maintenanceEvery;
      this.weapon.fitForUse = this.weaponForm.value.fitForUse;
      this.weapon.pricePerHour = this.weaponForm.value.pricePerHour;
      this.weapon.inMaintenance = this.weaponForm.value.inMaintenance;
      this.weapon.serialNumber = this.weaponForm.value.serialNumber;
  
      const observer: Observer<any> = {
        next: response => {
          if (this.isAddWeaponRoute) {
            this.responsePopupHeader = 'Pomyślnie dodano broń ' + this.weapon.name + '.';
          } else {
            this.responsePopupHeader = 'Pomyślnie zaktualizowano broń ' + this.weapon.name + '.';
          }
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: error => {
          if (this.isAddWeaponRoute) {
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
      if (this.isAddWeaponRoute) {
        this.weaponService.addWeapon(this.weapon).subscribe(observer);
      } else {
        this.weaponService.updateWeapon(this.weapon).subscribe(observer);
      }
    }
  }
  
  // Open the main page after user clicks on the response pop-up
  public responsePopupCancelAction(): void {
    this.location.back();
  }
  
  // User clicks go back from the form page
  public goBack(): void {
    this.location.back();
  }
}
