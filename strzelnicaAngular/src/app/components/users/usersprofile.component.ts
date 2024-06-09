import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Users } from '../../interfaces/users';
import { UserService } from '../../services/users.service';
import { JoinRequestService } from '../../services/joinrequest.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './usersprofile.component.html',
  styleUrls: [    
    // Style exclusive for this component
    '/src/app/styles/usersprofile.component.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css',
    // Shared form styles
    '/src/app/styles/shared-form-styles.css']
})
export class UsersProfileComponent implements OnInit {
  currentUser: Users | null = null;
  showMembershipForm: boolean = false;
  membershipMessage: string = '';

  constructor(
    private userService: UserService, 
    private joinRequestService: JoinRequestService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (user: Users) => {
        this.currentUser = user;
        this.cd.detectChanges();
      },
      (error: any) => {
        console.error("Błąd podczas pobierania użytkownika", error);
      }
    );
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
}
