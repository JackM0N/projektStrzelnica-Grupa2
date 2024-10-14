import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../interfaces/news';
import { isImageValid } from '../../utils/utils';
import { PaginationComponent } from '../pagination.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: [
    '/src/app/styles/news.component.css',
    '/src/app/styles/shared-list-styles.css',
    '/src/app/styles/shared-button-styles.css']
})
// Component that displays the news
export class NewsComponent implements AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  newsList: News[] = [];

  constructor(
    private newsService: NewsService,
    public authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  // After init - because we need the pagination to load first
  // Fetch the news from the database and display them
  ngAfterViewInit(): void {
    this.fetchNews();
    // The DOM has been changed, we need to detect the changes to prevent ExpressionChangedAfterItHasBeenCheckedError
    this.cd.detectChanges();
  }
  
  fetchNews(): void {
    this.newsService.getPaginatedNews(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(news => {
      this.paginationComponent.totalPages = news.totalPages;
      this.paginationComponent.calculatePages();

      news.content.forEach((item: { content: string | null | undefined; picture: string; date: string, deleted: boolean }) => {
        if (item.content !== null && item.content !== undefined) {
          item.content = this.changeNlForP(item.content);
        }
        if (!isImageValid(item.picture)) {
          item.picture = '';
        }
      });

      // Filter news based on user role
      if (!this.authService.hasAnyRole(['ADMIN', 'WORKER'])) {
        this.newsList = news.content.filter((item: { deleted: any; }) => !item.deleted);
      } else {
        this.newsList = news.content;
      }
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
