import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../services/news.service';
import { NewsDeletedPopupComponent } from './newsdeletedpopup.component';

@Component({
  selector: 'app-news-delete',
  templateUrl: './newsdelete.component.html',
  styleUrls: ['../styles/newsdelete.component.css']
})

export class NewsDeleteComponent implements OnInit {
  @Input() news: any;
  @ViewChild(NewsDeletedPopupComponent) deletedPopup!: NewsDeletedPopupComponent;

  public show = false;
  public isDeleted = false;
  public headerName = '';
  public buttonText = '';
  public messageText = '';

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.isDeleted = this.news.deleted;
    if (this.isDeleted == true){
      this.headerName = "Czy na pewno chcesz przywrócić " + this.news.title + "?";
      this.buttonText = "Przywróć"
      this.messageText = "przywrócić";
    } else {
      this.headerName = "Czy na pewno chcesz usunąć " + this.news.title + "?";
      this.buttonText = "Usuń"
      this.messageText = "usunąć";
    }
  }

  public open(): void {
    this.show = true;
  }
  
  public close(): void {
    this.show = false;
  }
  
  public confirm(): void {
    this.show = false;

    this.newsService.deleteNews(this.news.id).subscribe(() => {
      this.deletedPopup.open();
    });
  }

  @HostListener("document:keydown", ["$event"])
  public keydown(event: KeyboardEvent): void {
    if (event.code === "Escape") {
      this.close();
    }
  }

  @HostListener("document:click", ["$event"])
  public documentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement.className == "popup-overlay") {
      this.close();
    }
  }
}
