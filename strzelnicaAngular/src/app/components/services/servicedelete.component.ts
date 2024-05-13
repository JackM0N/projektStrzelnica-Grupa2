import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { PopupComponent } from '../popup.component';

@Component({
  selector: 'app-service-delete',
  templateUrl: './servicedelete.component.html',
  styleUrls: ['/src/app/styles/shared-button-styles.css']
})

// Confirm pop-up for deleting service
export class ServiceDeleteComponent implements OnInit {
  @Input() service: any;
  @ViewChild('confirmDeletionPopup') confirmDeletionPopup!: PopupComponent;
  @ViewChild('responsePopup') responsePopup!: PopupComponent;

  public confirmDeletionPopupHeader = '';
  public confirmDeletionPopupMessage = '';
  public confirmDeletionPopupConfirmText = '';
  public confirmDeletionPopupConfirmNgClass = '';
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
  public isDeleted = false;

  constructor(private serviceService: ServicesService) {}

  ngOnInit() {
      this.confirmDeletionPopupHeader = 'Czy na pewno chcesz usunąć ' + this.service.name + '?';
      this.confirmDeletionPopupConfirmText = "Usuń";
      this.confirmDeletionPopupConfirmNgClass = "button-delete";
    }
  
  // User clicks confirm, delete the service from the database
  public confirmAction(): void {
    this.serviceService.deleteService(this.service.id).subscribe({
      next: (response) => {
        if (this.isDeleted) {
          this.responsePopupHeader = 'Pomyślnie przywrócono ofertę ' + this.service.name + '.';
        } else {
          this.responsePopupHeader = 'Pomyślnie usunięto ofertę ' + this.service.name + '.';
        }
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
