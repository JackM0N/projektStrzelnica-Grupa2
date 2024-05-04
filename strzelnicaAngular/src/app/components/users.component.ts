import { ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { UserService } from '../services/users.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    // Styles shared between all the list components
    '../styles/shared-list-styles.css',
    // Shared button styles
    '../styles/button-styles.css'
  ]
})
export class UsersComponent {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  userList: Users[] = [];

  constructor(private userService: UserService, private cd: ChangeDetectorRef) {}

  // After init - because we need the pagination to load first
  // Fetch weapons from the database and display them
  ngAfterViewInit(): void {
    this.fetchUsers();
    // The DOM has been changed, we need to detect the changes to prevent ExpressionChangedAfterItHasBeenCheckedError
    this.cd.detectChanges();
  }

  // Fetches all weapons from the database
  fetchUsers(): void {
    this.userService.getPaginatedUsers(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(users => {
      this.paginationComponent.totalPages = users.totalPages;
      this.paginationComponent.calculatePages();
      this.userList = users.content;
    });
  }
}