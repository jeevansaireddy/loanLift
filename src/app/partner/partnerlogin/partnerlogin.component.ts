// partner-login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient , HttpClientModule} from '@angular/common/http';

import { Router } from '@angular/router';



@Component({
  selector: 'app-partner-login',
  templateUrl: './partnerlogin.component.html',
  styleUrls: ['./partnerlogin.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class PartnerloginComponent {
  readonly BASE_URL = 'https://1b18-2405-201-c009-687f-adaa-a207-8ee6-4dbd.ngrok-free.app';
  signupForm: FormGroup;
  signinForm: FormGroup;
  isSignup = false;
  submitted = false; // Add this to track form submission attempts

  constructor(private fb: FormBuilder , private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Add methods to check form validity
  isSignupFormInvalid(): boolean {
    return this.signupForm.invalid || 
           this.signupForm.hasError('mismatch') || 
           !this.signupForm.get('email')?.value || 
           !this.signupForm.get('password')?.value ||
           !this.signupForm.get('confirmPassword')?.value;
  }

  isSigninFormInvalid(): boolean {
    return this.signinForm.invalid || 
          this.signupForm.hasError('mismatch') || 
           !this.signinForm.get('email')?.value || 
           !this.signinForm.get('password')?.value;
  }

  onSignup() {
    this.submitted = true;
    if (!this.isSignupFormInvalid()) {
      console.log('Signup form data:', this.signupForm.value);
    }
  }

  onSignin() {
    this.submitted = true;
  
    if (this.signinForm.valid) {
      const  email = this.signinForm.value.email;
      const password = this.signinForm.value.password;
  
      this.http.post(this.BASE_URL+'/users/login/', { email, password }).subscribe(
        (response: any) => {
          // Handle successful login
          console.log('Login successful:', response);
  
          // Store the token (if received in the response)
          localStorage.setItem('token', response.access_token);
  
          // Redirect to the desired page
          this.router.navigate(['/partner/dashboard']);
        },
        (error: any) => {
          // Handle login error
          console.error('Login error:', error);
        }
      );
    }
  }

  toggleForm() {
    this.isSignup = !this.isSignup;
    this.submitted = false; // Reset submitted state when switching forms
    // Reset forms when toggling
    if (this.isSignup) {
      this.signupForm.reset();
    } else {
      this.signinForm.reset();
    }
  }
}