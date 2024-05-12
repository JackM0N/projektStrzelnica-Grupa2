import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { News } from '../../interfaces/news';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PopupComponent } from '../popup.component';
import { Observer } from 'rxjs';
import { Location } from '@angular/common';
import { formatDateForInput } from '../../utils/utils';

@Component({
  selector: 'app-add-news',
  templateUrl: './newsform.component.html',
  styleUrls: [
    // Shared button styles
    '/src/app/styles/shared-button-styles.css',
    // Shared form styles
    '/src/app/styles/shared-form-styles.css'
  ]
})

// Component for adding or editing news
export class NewsFormComponent implements OnInit {
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
  @ViewChild('dateInput') dateInput?: ElementRef;
  newsForm: FormGroup;
  formatDateForInput = formatDateForInput;
  
  isAddNewsRoute: boolean;
  newsId: number = 0;
  actionText = 'Dodaj nowy post';

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
    private location: Location,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private formBuilder: FormBuilder,
  ) {
    this.isAddNewsRoute = this.route.snapshot.routeConfig?.path?.includes('/add') == true;
    if(!this.isAddNewsRoute) {
      this.actionText = 'Edytuj post';
    }

    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      picture: ['', Validators.required],
      date: [new Date(), Validators.required],
      content: ['', Validators.required]
    });
  }

  // On init, if there is an id in the page URL, fetch the news with that id and display it
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.newsId = + params['id'];
        this.newsService.getNewsById(this.newsId).subscribe((news: News) => {
          this.news = news;
        });
      }
    });
  }

  // On submit, user clicks to confirm adding/editing news, complete it with the database
  onSubmit() {
    if (this.newsForm.valid) {
      this.news.title = this.newsForm.value.title;
      this.news.picture = this.newsForm.value.picture;
      this.news.content = this.newsForm.value.content;

      // Get the date value directly from the component to avoid problems
      if(this.dateInput != undefined) {
        const inputValue = this.dateInput.nativeElement.value;
        this.news.date = inputValue;
      }
  
      const observer: Observer<any> = {
        next: response => {
          if (this.isAddNewsRoute) {
            this.responsePopupHeader = 'Pomyślnie dodano news ' + this.news.title + '.';
          } else {
            this.responsePopupHeader = 'Pomyślnie zaktualizowano news ' + this.news.title + '.';
          }
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: error => {
          if (this.isAddNewsRoute) {
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
      if (this.isAddNewsRoute) {
        this.newsService.addNews(this.news).subscribe(observer);
      } else {
        this.newsService.updateNews(this.news).subscribe(observer);
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
