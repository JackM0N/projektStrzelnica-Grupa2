import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../styles/users.component.css']
})
export class UsersComponent {
  users: Users[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.userService.getUsers().subscribe(response => {
      if (response && Array.isArray(response)) {
        this.users = response; // Assign the response directly to users
      }
    });
  }
  
  editUser(userId: number): void {
    this.router.navigate(['/edit', userId]); // Navigate to edit component with user ID
  }
}