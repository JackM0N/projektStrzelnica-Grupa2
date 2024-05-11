
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/users.service';
import { Users } from '../interfaces/users';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../styles/registration.component.css',
        // Shared button styles
        '../styles/shared-button-styles.css',
        // Shared form styles
        '../styles/shared-form-styles.css'
  ]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log("Submitting registration form...");
    
    if (this.registrationForm.valid) {
      console.log("Form is valid. Proceeding with submission.");
      
      const userData: Users = this.registrationForm.value;
      console.log("Form data:", userData);

      const observer: Observer<any> = {
        next: response => {
          console.log("Registration successful:", response);
          // TODO: Handle success response from the backend
        },
        error: error => {
          console.error("Registration failed:", error);
          // TODO: Handle error response from the backend
        },
        complete: () => {}
      };
      this.userService.registerUser(userData).subscribe(observer);
      
    } else {
      console.log("Form is invalid. Cannot submit.");
    }
  }
}
