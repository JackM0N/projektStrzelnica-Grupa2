import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { PopupComponent } from '../popup.component';

@Component({
  selector: 'app-news-delete',
  templateUrl: './newsdelete.component.html',
  styleUrls: ['/src/app/styles/shared-button-styles.css']
})

// Confirm pop-up for deleting news
export class NewsDeleteComponent implements OnInit {
  @Input() news: any;
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

  constructor(private newsService: NewsService) {}

  // On init, determine whether we are deleting or restoring
  ngOnInit() {
    this.isDeleted = this.news.deleted;
    if (this.isDeleted == true) {
      this.confirmDeletionPopupHeader = 'Czy na pewno chcesz przywrócić ' + this.news.title + '?';
      this.confirmDeletionPopupConfirmText = 'Przywróć';
      this.confirmDeletionPopupConfirmNgClass = 'button-restore-deleted';

    } else {
      this.confirmDeletionPopupHeader = 'Czy na pewno chcesz usunąć ' + this.news.title + '?';
      this.confirmDeletionPopupConfirmText = "Usuń";
      this.confirmDeletionPopupConfirmNgClass = "button-delete";
    }
  }
  
  // User clicks confirm, delete the news from the database
  public confirmAction(): void {
    this.newsService.deleteNews(this.news.id).subscribe({
      next: (response) => {
        if (this.isDeleted) {
          this.responsePopupHeader = 'Pomyślnie przywrócono news ' + this.news.title + '.';
        } else {
          this.responsePopupHeader = 'Pomyślnie usunięto news ' + this.news.title + '.';
        }
        this.responsePopupNgClass = 'popupSuccess';
        this.responsePopup.open();
      },
      error: (error) => {
        if (this.isDeleted) {
          this.responsePopupHeader = 'Przy przywracaniu napotkano błąd.';
        } else {
          this.responsePopupHeader = 'Przy usuwaniu napotkano błąd.';
        }
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
