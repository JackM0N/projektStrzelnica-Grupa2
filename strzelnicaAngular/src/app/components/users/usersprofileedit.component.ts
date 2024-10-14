import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/users.service';
import { Users } from '../../interfaces/users';
import { PopupComponent } from '../popup.component';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-users-profile-edit',
  templateUrl: './usersprofileedit.component.html',
  styleUrls: [
    '/src/app/styles/usersform.component.css',
    '/src/app/styles/shared-button-styles.css',
    '/src/app/styles/shared-form-styles.css'
  ]
})
export class UsersProfileEditComponent implements OnInit {
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
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
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: Users) => {
      this.user = user;
      this.userForm.patchValue(user);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser: Users = {
        ...this.user,
        ...this.userForm.value
      };

      const observer: Observer<any> = {
        next: () => {
          this.responsePopupHeader = 'Pomyślnie zaktualizowano użytkownika ' + updatedUser.name + '.';
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: error => {
          this.responsePopupHeader = 'Przy aktualizacji użytkownika napotkano błąd.';
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
          this.responsePopup.open();
        },
        complete: () => {}
      };

      this.userService.updateCurrentUser(updatedUser).subscribe(observer);
    }
  }

  public responsePopupCancelAction(): void {
    this.location.back();
  }
  
  public goBack(): void {
    this.location.back();
  }
}
