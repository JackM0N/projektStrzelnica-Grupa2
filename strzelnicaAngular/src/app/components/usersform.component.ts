import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { NgForm } from '@angular/forms';
import { UserService } from '../services/users.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-users-form',
  templateUrl: './usersform.component.html',
  styleUrls: ['../styles/usersform.component.css']
})
export class UsersFormComponent implements OnInit {
  user: Users = { id: 0, name: '', surname: '', password: '', email: '', dateOfBirth: new Date(), clubMember: false };
  userId!: number; // Initialize userId with a definite assignment assertion

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.getUser(this.userId);
  }

  getUser(id: number): void {
    this.userService.getUsers().subscribe(users => {
      const user = users.find(u => u.id === id);
      if (user) {
        this.user = user;
      } else {
        console.error(`User with ID ${id} not found.`);
      }
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.userId, this.user).subscribe(updatedUser => {
      console.log('User updated successfully:', updatedUser);
      // Navigate back to /users route after editing
      this.router.navigate(['/users']); // Navigate to the users route
    });
  }
}
