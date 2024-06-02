import { Component, OnInit,ChangeDetectorRef, ViewChild } from '@angular/core';
import { Users } from '../../interfaces/users';
import { UserService } from '../../services/users.service';
import { error } from 'node:console';

@Component({
  selector: 'app-users-profile',
  templateUrl: './usersprofile.component.html',
  styleUrls: [    
    // Style exclusive for this component
    '/src/app/styles/usersprofile.component.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css']
})
export class UsersProfileComponent implements OnInit {
  currentUser: Users | null = null;

  constructor(
    private userService: UserService, 
    private cd: ChangeDetectorRef,
  ) { }

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
    // Implementacja wysyłania prośby o dołączenie do klubu
    console.log('Prośba o dołączenie do klubu wysłana');
  }
}