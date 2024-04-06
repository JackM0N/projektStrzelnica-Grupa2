import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-deletedpopup',
  templateUrl: './newsdeletedpopup.component.html',
  styleUrls: ['../styles/newsdelete.component.css']
})

export class NewsDeletedPopupComponent implements OnInit {
  @Input() news: any;

  public show = false;
  public headerName = '';
  public buttonText = '';
  public isDeleted = false;

  constructor() {}

  ngOnInit() {
    this.isDeleted = this.news.deleted;
    if (this.isDeleted == false) {
      this.headerName = "Pomyślnie usunięto " + this.news.title + "!";
    } else {
      this.headerName = "Pomyślnie przywrócono " + this.news.title + "!";
    }
  }

  public open(): void {
    this.show = true;
  }
  
  public close(): void {
    this.show = false;
    window.location.reload();
  }
}
