import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CompetitionsService } from '../../services/competitions.service';
import { PopupComponent } from '../popup.component';

@Component({
  selector: 'app-competitions-delete',
  templateUrl: './competitionsdelete.component.html',
  styleUrls: [
    '/src/app/styles/shared-button-styles.css'
  ]
})
// Confirm pop-up for deleting competitions
export class CompetitionsDeleteComponent implements OnInit {
  @Input() competition: any;
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

  constructor(private competitionsService: CompetitionsService) {}

  // On init, determine whether we are deleting or restoring
  ngOnInit() {
    this.isDeleted = this.competition.deleted;
    if (this.isDeleted) {
      this.confirmDeletionPopupHeader = 'Czy na pewno chcesz przywrócić ' + this.competition.name + '?';
      this.confirmDeletionPopupConfirmText = 'Przywróć';
      this.confirmDeletionPopupConfirmNgClass = 'button-restore-deleted';
    } else {
      this.confirmDeletionPopupHeader = 'Czy na pewno chcesz usunąć ' + this.competition.name + '?';
      this.confirmDeletionPopupConfirmText = "Usuń";
      this.confirmDeletionPopupConfirmNgClass = "button-delete";
    }
  }

  // User clicks confirm, delete the competition from the database
  public confirmAction(): void {
    this.competitionsService.deleteCompetition(this.competition.id).subscribe({
      next: () => {
        this.responsePopupHeader = 'Pomyślnie usunięto zawody ' + this.competition.name + '.';
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
