// registration.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/users.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../styles/registration.component.css']
})
export class RegistrationComponent {
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

  onSubmit() {
    console.log("Submitting registration form...");
    
    if (this.registrationForm.valid) {
      console.log("Form is valid. Proceeding with submission.");
      
      const userData: Users = this.registrationForm.value;
      console.log("Form data:", userData);
      
      this.userService.registerUser(userData).subscribe(response => {
        console.log("Registration successful:", response);
        // Handle success response from the backend
      }, error => {
        console.error("Registration failed:", error);
        // Handle error response from the backend
      });
    } else {
      console.log("Form is invalid. Cannot submit.");
    }
  }
  
}
