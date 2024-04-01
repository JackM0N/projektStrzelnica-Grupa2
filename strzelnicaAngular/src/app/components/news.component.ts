import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../interfaces/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['../styles/news.component.css']
})

export class NewsComponent implements OnInit {

  newsList: News[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.newsService.getNews()
      .subscribe(news => {
        news.forEach(item => {
            if (item.content !== null && item.content !== undefined){
                item.content = changeNlForP(item.content);
            }
        });
        this.newsList = news;
      });
  }
}

//This function replaces newline character for <p> blocks
function changeNlForP(text: string): string {
    let editedText = '<p>' + text;
    editedText = editedText.replace(/\n/g, '</p><p>');
    editedText += '</p>';
    return editedText;
}