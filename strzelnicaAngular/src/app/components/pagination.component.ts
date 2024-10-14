import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['/src/app/styles/pagination-component.css']
})
export class PaginationComponent {
  currentPage: number = 1;
  maxItems: number = 5;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  @Output() onPageChange = new EventEmitter<void>();

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

  goToPageNum(page: number): void {
    this.currentPage = page;
    this.calculatePages();
    this.onPageChange.emit();
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.calculatePages();
    this.onPageChange.emit();
  }
  
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculatePages();
      this.onPageChange.emit();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculatePages();
      this.onPageChange.emit();
    }
  }

  isCurrentPage(page: number): boolean {
    return this.currentPage === page;
  }
}
