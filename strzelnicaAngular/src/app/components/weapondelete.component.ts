import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WeaponService } from '../services/weapon.service';
import { PopupComponent } from './popup.component';

@Component({
  selector: 'app-weapon-delete',
  templateUrl: './weapondelete.component.html',
  styleUrls: ['../styles/button-styles.css']
})

// Confirm pop-up for deleting weapons
export class WeaponDeleteComponent implements OnInit {
  @Input() weapon: any;
  @ViewChild('confirmDeletionPopup') confirmDeletionPopup!: PopupComponent;
  @ViewChild('responsePopup') responsePopup!: PopupComponent;

  public confirmDeletionPopupHeader = '';
  public confirmDeletionPopupMessage = '';
  public confirmDeletionPopupConfirmText = '';
  public confirmDeletionPopupConfirmNgClass = '';
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';

  constructor(private weaponService: WeaponService) {}

  ngOnInit() {
    this.confirmDeletionPopupHeader = 'Czy na pewno chcesz usunąć ' + this.weapon.name + '?';
    this.confirmDeletionPopupConfirmText = "Usuń";
    this.confirmDeletionPopupConfirmNgClass = "button-delete";
  }
  
  // User clicks confirm, delete the weapon from the database
  public confirmAction(): void {
    this.weaponService.deleteWeapon(this.weapon.id).subscribe({
      next: (response) => {
        this.responsePopupHeader = 'Pomyślnie usunięto broń ' + this.weapon.name + '.';
        this.responsePopupNgClass = 'popupSuccess';
        this.responsePopup.open();
      },
      error: (error) => {
        this.responsePopupHeader = 'Przy usuwaniu napotkano błąd.';
        this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
        this.responsePopupNgClass = 'popupError';
        this.responsePopup.open();
      }
    });
  }
  
  // User clicks to delete the button, open the confirmation pop-up
  public openConfirmPopup(): void {
    this.confirmDeletionPopup.open();
  }

  // Reload the page after user clicks on the response pop-up
  public responsePopupCancelAction(): void {
    window.location.reload();
  }
}
