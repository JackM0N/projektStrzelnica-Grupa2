import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../interfaces/news';
import { isImageValid } from '../utils/utils';
import { PaginationComponent } from './pagination.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: [
    // Style exclusive for this component
    '../styles/news.component.css',
    // Styles shared between all the list components
    '../styles/shared-list-styles.css',
    // Shared button styles
    '../styles/button-styles.css']
})

// Component that displays the news
export class NewsComponent implements AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  newsList: News[] = [];

  constructor(private newsService: NewsService, private cd: ChangeDetectorRef) {}

  // After init - because we need the pagination to load first
  // Fetch the news from the database and display them
  ngAfterViewInit(): void {
    this.fetchNews();
    // The DOM has been changed, we need to detect the changes to prevent ExpressionChangedAfterItHasBeenCheckedError
    this.cd.detectChanges();
  }
  
  // Fetches all news from the database
  fetchNews(): void {
    this.newsService.getPaginatedNews(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(news => {
      this.paginationComponent.totalPages = news.totalPages;
      this.paginationComponent.calculatePages();

      news.content.forEach((item: { content: string | null | undefined; picture: string; date: string }) => {
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

  // Date formatting
  formatDate(date: Date): string {
    // Parse the date string - fixes date.toLocaleDateString not being a thing
    const date2 = new Date(date.toString());
    // Format the date using toLocaleDateString with the user's locale
    const formattedDate = date2.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    return formattedDate.toString();
  }

  // Replaces newline character for <p> blocks
  changeNlForP(text: string): string {
    let editedText = '<p>' + text;
    editedText = editedText.replace(/\n/g, '</p><p>');
    editedText += '</p>';
    return editedText;
  }
}
