import { Component, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Users } from '../interfaces/users';
import { PaginationComponent } from './pagination.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    '../styles/users.component.css',
    '../styles/shared-lists-styles.css',
    '../styles/button-styles.css'
  ]
})
export class UsersComponent implements AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  usersList: Users[] = [];

  constructor(private usersService: UsersService, private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    if (this.paginationComponent) {
      this.fetchUsers();
      this.cd.detectChanges();
    }
  }

  fetchUsers(): void {
    if (this.paginationComponent) {
      this.usersService.getPaginatedUsers(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(users => {
        if (this.paginationComponent) {
          this.paginationComponent.totalPages = users.totalPages;
          this.paginationComponent.calculatePages();

          this.usersList = users.content;
        }
      });
    }
  }
}
