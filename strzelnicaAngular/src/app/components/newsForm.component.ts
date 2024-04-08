import { Component, OnInit, ViewChild } from '@angular/core';
import { News } from '../interfaces/news';
import { NewsService } from '../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PopupComponent } from './popup.component';

@Component({
  selector: 'app-add-news',
  templateUrl: './newsform.component.html',
  styleUrls: ['../styles/newsform.component.css', '../styles/button-styles.css']
})

// Component for adding or editing news
export class NewsFormComponent implements OnInit {
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
  
  isAddNewsRoute: boolean;
  newsId: number = 0;
  actionText = 'Dodaj';

  news: News = {
    title: '',
    picture: '',
    date: new Date(),
    authorId: 0,
    content: '',
    deleted: false
  };

  // Constructor, determine whether we are adding or editing news
  constructor (
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {
    this.isAddNewsRoute = this.route.snapshot.routeConfig?.path?.includes('news/add') == true;
    if(!this.isAddNewsRoute) {
      this.actionText = 'Edytuj';
    }
  }

  // On init, if there is an id in the page URL, fetch the news with that id and display it
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.newsId = +params['id'];
        this.newsService.getNewsById(this.newsId).subscribe((news: News) => {
          this.news = news;
        });
      }
    });
  }

  // On submit, user clicks to confirm adding/editing news, complete it with the database
  onSubmit(f: NgForm) {
    if (f.valid) {
      this.news.title = f.value.title;
      this.news.picture = f.value.picture;
      this.news.date = new Date(f.value.date);
      this.news.content = f.value.content;
  
      if (this.isAddNewsRoute) {
        this.newsService.addNews(this.news).subscribe(
          (response) => {
            this.responsePopupHeader = 'Pomyślnie dodano news ' + this.news.title + '.';
            this.responsePopupNgClass = 'popupSuccess';
            this.responsePopup.open();
          },
          (error) => {
            this.responsePopupHeader = 'Przy dodawaniu napotkano błąd.';
            this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
            this.responsePopupNgClass = 'popupError';
            this.responsePopup.open();
        });

      } else {
        this.newsService.updateNews(this.news).subscribe((response) => {
          this.responsePopupHeader = 'Pomyślnie zaktualizowano news ' + this.news.title + '.';
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        (error) => {
          this.responsePopupHeader = 'Przy aktualizacji napotkano błąd.';
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
          this.responsePopup.open();
        });
      }
    }
  }
  
  // Open the main page after user clicks on the response pop-up
  public responsePopupCancelAction(): void {
    this.router.navigateByUrl('/');
  }
  
  // User clicks go back from the form page
  public goBack(): void {
    this.router.navigateByUrl('/');
  }
}
