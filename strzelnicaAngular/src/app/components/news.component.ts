import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../interfaces/news';
import { isImageValid } from '../utils/utils';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['../styles/news.component.css', '../styles/button-styles.css']
})

// Component that displays the news
export class NewsComponent implements OnInit {
  newsList: News[] = [];

  constructor(private newsService: NewsService) { }

  // On init, fetch the news from the database and display them
  ngOnInit(): void {
    this.fetchNews();
  }
  
  // Fetches all news from the database
  fetchNews(): void {
    this.newsService.getNews().subscribe(news => {
        news.forEach(item => {
            // If content is valid, replace newline characters for <p> blocks
            if (item.content !== null && item.content !== undefined) {
              item.content = this.changeNlForP(item.content);
            }
            // Check if the image of the news is valid, if not, hide it
            if (!isImageValid(item.picture)) {
              item.picture = '';
            }
        });
        this.newsList = news;
      });
  }
  
  // Replaces newline character for <p> blocks
  changeNlForP(text: string): string {
    let editedText = '<p>' + text;
    editedText = editedText.replace(/\n/g, '</p><p>');
    editedText += '</p>';
    return editedText;
  }
}
