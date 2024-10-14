import { AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { PaginationComponent } from '../pagination.component';
import { UserService } from '../../services/users.service';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    '/src/app/styles/shared-list-styles.css',
    '/src/app/styles/shared-button-styles.css'
  ]
})
export class UsersComponent implements AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  userList: Users[] = [];

  constructor(private userService: UserService, private cd: ChangeDetectorRef) {}

  // After init - because we need the pagination to load first
  // Fetch users from the database and display them
  ngAfterViewInit(): void {
    this.fetchUsers();
    // The DOM has been changed, we need to detect the changes to prevent ExpressionChangedAfterItHasBeenCheckedError
    this.cd.detectChanges();
  }

  // Fetches all users from the database
  fetchUsers(): void {
    this.userService.getPaginatedUsers(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(users => {
      this.paginationComponent.totalPages = users.totalPages;
      this.paginationComponent.calculatePages();
      this.userList = users.content;
    });
  }
}
