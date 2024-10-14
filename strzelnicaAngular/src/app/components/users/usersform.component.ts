import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/users.service';
import { Users } from '../../interfaces/users';
import { PopupComponent } from '../popup.component';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './usersform.component.html',
  styleUrls: [
    '/src/app/styles/usersform.component.css',
    '/src/app/styles/shared-button-styles.css',
    '/src/app/styles/shared-form-styles.css'
  ]
})
export class UsersFormComponent implements OnInit {
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
  userId: number = 0;
  userForm: FormGroup;

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
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clubMember: [false],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = +params['id'];
        this.userService.getUserById(this.userId).subscribe((user: Users) => {
          this.user = user;
        });
      }
    });
  }

  // On submit, user clicks to confirm adding/editing a user, complete it with the database
  onSubmit() {
    if (this.userForm.valid) {
      this.user.name = this.userForm.value.name;
  
      this.userService.updateUser(this.user).subscribe({
        next: () => {
          this.responsePopupHeader = 'Pomyślnie zaktualizowano użytkownika ' + this.user.name + '.';
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: (error: any) => {
          this.responsePopupHeader = 'Przy aktualizacji użytkownika napotkano błąd.';
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
          this.responsePopup.open();
        }
      });
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
}
