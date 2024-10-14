import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Users } from '../../interfaces/users';
import { UserService } from '../../services/users.service';
import { JoinRequestService } from '../../services/joinrequest.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-profile',
  templateUrl: './usersprofile.component.html',
  styleUrls: [    
    '/src/app/styles/usersprofile.component.css',
    '/src/app/styles/shared-button-styles.css',
    '/src/app/styles/shared-form-styles.css'
  ]
})
export class UsersProfileComponent implements OnInit {
  currentUser: Users | null = null;
  showMembershipForm: boolean = false;
  membershipMessage: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private joinRequestService: JoinRequestService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user: Users) => {
        this.currentUser = user;
        this.cd.detectChanges();
      },
      error: (error: any) => {
        console.error("Error fetching user", error);
      }
    });
  }

  requestClubMembership(): void {
    this.showMembershipForm = true;
  }

  closeMembershipForm(): void {
    this.showMembershipForm = false;
    this.membershipMessage = '';
  }

  submitMembershipRequest(): void {
    if (this.currentUser) {
      this.joinRequestService.sendJoinRequest(this.currentUser.id, this.membershipMessage).subscribe(
        response => {
          console.log('Prośba o dołączenie do klubu wysłana:', response);
          this.closeMembershipForm();
        },
        error => {
          console.error('Błąd podczas wysyłania prośby o dołączenie do klubu', error);
        }
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
