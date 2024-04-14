import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../interfaces/news';
import { isImageValid } from '../utils/utils';
import { PaginationComponent } from './pagination.component';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: [
    // Style exclusive for the weapons component
    '../styles/weapons.component.css',
    // Styles shared between all the list components
    '../styles/shared-lists-styles.css',
    // Shared button styles
    '../styles/button-styles.css']
})

// Component that displays the news
export class WeaponsComponent implements  AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  weaponsList: News[] = [];

  constructor(private newsService: NewsService, private cd: ChangeDetectorRef) { }

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
      this.weaponsList = news.content;
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
