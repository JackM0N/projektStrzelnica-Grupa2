import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service'; // Import the service for fetching users
import { Users } from '../interfaces/users'; // Import the Users interface
import { PaginationComponent } from './pagination.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    '../styles/users.component.css', // Style for the users component
    '../styles/shared-lists-styles.css', // Shared styles for lists
    '../styles/button-styles.css' // Shared button styles
  ]
})
export class UsersComponent implements AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  usersList: Users[] = [];

  constructor(private usersService: UsersService, private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.fetchUsers();
    this.cd.detectChanges();
  }

  fetchUsers(): void {
    this.usersService.getPaginatedUsers(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(users => {
      this.paginationComponent.totalPages = users.totalPages;
      this.paginationComponent.calculatePages();

      this.usersList = users.content;
    });
  }
}
