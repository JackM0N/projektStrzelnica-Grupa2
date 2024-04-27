import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../services/users.service';
import { Users } from '../interfaces/users';
import { PopupComponent } from './popup.component';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-users-form',
  templateUrl: './usersform.component.html',
  styleUrls: [
    // Style exclusive for this component
    '../styles/usersform.component.css',
    // Shared button styles
    '../styles/button-styles.css',
    // Shared form styles
    '../styles/shared-form-styles.css'
  ]
})
export class UsersFormComponent implements OnInit {
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
  userId: number = 0;
  isRegisterRoute: boolean;
  actionText = '';

  
  user: Users = {
    id: 0,
    name: '',
    surname: '',
    password: '',
    email: '',
    dateOfBirth: new Date(),
    clubMember: false
  };

  constructor(
    private location: Location,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isRegisterRoute = this.route.snapshot.routeConfig?.path?.includes('/register') == true;
    if(!this.isRegisterRoute) {
      this.actionText = 'Zarejestruj nowego użytkownika';
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = +params['id'];
        this.userService.getUserById(this.userId).subscribe((user: Users) => {
          this.user = user;
        });
      } else if (this.router.url.includes('register')) {
        this.isRegisterRoute = true; // Set to true when registering
      }
    });
  }

  // On submit, user clicks to confirm adding/editing a user, complete it with the database
  onSubmit(f: NgForm) {
    if (f.valid) {
      this.user.name = f.value.name;
  
      const observer: Observer<any> = {
        next: response => {
          if (this.isRegisterRoute){
            this.responsePopupHeader = 'Pomyślnie zarejestrowano użytkownika użytkownika ' + this.user.name + '.';
          }else{
            this.responsePopupHeader = 'Pomyślnie zaktualizowano użytkownika ' + this.user.name + '.';
          }
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: error => {
          if (this.isRegisterRoute){
            this.responsePopupHeader = 'Ten e-mail już został zarejestrowany! Spróbuj inny lub odzyskaj hasło.';
          }else{
            this.responsePopupHeader = 'Przy aktualizacji użytkownika napotkano błąd.';
          }
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
          this.responsePopup.open();
        },
        complete: () => {}
      };

      console.log(this.user)

      // Subscribe using the observer object
      if (this.isRegisterRoute){
        this.userService.registerUser(this.user).subscribe(observer);
      }else {
        this.userService.updateUser(this.user).subscribe(observer);
      }
    }
  }

  // Open the main page after user clicks on the response pop-up
  public responsePopupCancelAction(): void {
    this.location.back();
  }
  
  // User clicks go back from the form page
  public goBack(): void {
    this.location.back();
  }

  isRegisterPage(): boolean {
    return this.isRegisterRoute;
  }
}
