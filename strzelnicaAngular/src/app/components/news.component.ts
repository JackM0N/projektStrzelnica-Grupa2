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
  currentPage: number = 1;
  maxItems: number = 5;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  constructor(private newsService: NewsService) { }

  // On init, fetch the news from the database and display them
  ngOnInit(): void {
    this.fetchNews();
  }
  
  // Fetches all news from the database
  fetchNews(): void {
    this.newsService.getPaginatedNews(this.currentPage, this.maxItems).subscribe(news => {
      this.totalPages = news.totalPages;
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);

      news.content.forEach((item: { content: string | null | undefined; picture: string; }) => {
          // If content is valid, replace newline characters for <p> blocks
          if (item.content !== null && item.content !== undefined) {
            item.content = this.changeNlForP(item.content);
          }
          // Check if the image of the news is valid, if not, hide it
          if (!isImageValid(item.picture)) {
            item.picture = '';
          }
      });
      this.newsList = news.content;
    });
  }

  // On page change
  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchNews();
  }
  
  // Go to previous page
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchNews();
    }
  }

  // Go to next page
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchNews();
    }
  }

  // Go to a specific page
  goToPage(event: Event): void {
    if(event != null && event.target != null) {
      const pageNumber = parseInt((event.target as HTMLSelectElement).value, 10);
      if (pageNumber && pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
        this.currentPage = pageNumber;
        this.fetchNews();
      }
    }
  }

  // Replaces newline character for <p> blocks
  changeNlForP(text: string): string {
    let editedText = '<p>' + text;
    editedText = editedText.replace(/\n/g, '</p><p>');
    editedText += '</p>';
    return editedText;
  }
}
