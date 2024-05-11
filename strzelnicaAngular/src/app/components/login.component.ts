import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/users.service';
import { Users } from '../interfaces/users';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles/login.component.css',
            // Shared button styles
            '../styles/shared-button-styles.css',
            // Shared form styles
            '../styles/shared-form-styles.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Submitting login form...");
    
    if (this.loginForm?.valid) {
      console.log("Form is valid. Proceeding with submission.");
      
      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
  
      if (credentials.email && credentials.password) {
        this.userService.login(credentials).subscribe(
          () => {
            console.log("Login successful");
            // TODO: Handle successful login (e.g., navigate to home page)
          },
          error => {
            console.error("Login failed:", error);
            // TODO: Handle login error (e.g., display error message)
          }
        );
      } else {
        console.log("Email or password is empty.");
      }
    } else {
      console.log("Form is invalid or null. Cannot submit.");
    }
  }
}
