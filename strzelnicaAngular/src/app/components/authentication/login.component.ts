import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '/src/app/styles/authentication.component.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css',
    // Shared form styles
    '/src/app/styles/shared-form-styles.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggedInUsername: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Check if user is already logged in
    this.loggedInUsername = localStorage.getItem('username') ?? ''; // Use nullish coalescing operator
  }

  // Method to update the "Zaloguj" text in the header based on login status
  getLoginButtonText() {
    return this.loggedInUsername ? this.loggedInUsername : 'Zaloguj';
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

        const observer: Observer<any> = {
          next: response => {
            console.log("Login successful");
            // Navigate to home page upon successful login
            this.router.navigate(['/news']);
            this.loggedInUsername = credentials.email;
            localStorage.setItem('username', this.loggedInUsername); // Save username to localStorage
          },
          error: error => {
            console.error("Login failed:", error);
            // TODO: Handle login error (e.g., display error message)
          },
          complete: () => {}
        };
        this.userService.login(credentials).subscribe(observer);

      } else {
        console.log("Email or password is empty.");
      }
      
    } else {
      console.log("Form is invalid or null. Cannot submit.");
    }
  }
}
