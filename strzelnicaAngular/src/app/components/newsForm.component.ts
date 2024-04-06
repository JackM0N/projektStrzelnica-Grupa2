import { Component, OnInit } from '@angular/core';
import { News } from '../interfaces/news';
import { NewsService } from '../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-news',
  templateUrl: './newsForm.component.html',
  styleUrls: ['../styles/newsForm.component.css']
})
export class NewsFormComponent implements OnInit {
  isAddNewsRoute: boolean;
  newsId: number = 0;
  news: News = {
    title: '',
    picture: '',
    date: new Date(), // Initialize with current date
    authorId: 0, // You may need to update this according to your logic
    content: '',
    deleted: false
  };
  actionText = 'Add';

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {
    this.isAddNewsRoute = this.route.snapshot.routeConfig?.path === '/news/add';
    if(!this.isAddNewsRoute){
      this.actionText = 'Edit';
    }
  }

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

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.news.title = f.value.title;
      this.news.picture = f.value.picture;
      this.news.date = new Date(f.value.date);
      this.news.content = f.value.content;
  
      if (this.isAddNewsRoute) {
        this.newsService.addNews(this.news).subscribe(() => {
          this.router.navigateByUrl('/');
        });
      } else {
        this.newsService.updateNews(this.news).subscribe(() => {
          this.router.navigateByUrl('/');
        });
      }
    }
  }
}
