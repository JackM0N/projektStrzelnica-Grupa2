import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['/src/app/styles/pagination-component.css']
})

// Pagination component on the bottom of the page
export class PaginationComponent {
  currentPage: number = 1;
  maxItems: number = 5;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  @Output() onPageChange = new EventEmitter<void>();

  constructor() {}

  calculatePages(): void {
    let startPage: number;
    let endPage: number;

    if (this.totalPages <= 5) {
      startPage = 1;
      endPage = this.totalPages;
    } else if (this.currentPage <= 2) {
      startPage = 1;
      endPage = 5;
    } else if (this.currentPage + 2 >= this.totalPages) {
      startPage = this.totalPages - 4;
      endPage = this.totalPages;
    } else {
      startPage = this.currentPage - 2;
      endPage = this.currentPage + 2;
    }

    this.pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  // On page change
  goToPageNum(page: number): void {
    this.currentPage = page;
    this.calculatePages();
    this.onPageChange.emit();
  }

  // Go to the last page
  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.calculatePages();
    this.onPageChange.emit();
  }
  
  // Go to previous page
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculatePages();
      this.onPageChange.emit();
    }
  }

  // Go to next page
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculatePages();
      this.onPageChange.emit();
    }
  }

  // Check if a page is the current page
  isCurrentPage(page: number): boolean {
    return this.currentPage === page;
  }
}
