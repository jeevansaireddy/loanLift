import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-customerlogin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './customerlogin.component.html',
  styleUrl: './customerlogin.component.scss'
})
export class CustomerloginComponent {


  signupForm: FormGroup;
  signinForm: FormGroup;
  isSignup = false;
  submitted = false; // Add this to track form submission attempts

  constructor(private fb: FormBuilder ,  private router: Router , private authservice: AuthserviceService) {
    this.signupForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
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
      const formData = {
        first_name: this.signupForm.value.firstName,
        last_name: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        role: 'customer' // Default role
      };
      this.authservice.register(formData).subscribe(
        response => {
          console.log('User registered successfully!', response);
          alert('Signup successful');
          this.isSignup=!this.isSignup;

        },
        error => {
          console.error('Signup error:', error);
          alert('Signup failed');
          
        }
      );
    }
  }

  onSignin() {
    this.submitted = true;
  
    if (this.signinForm.valid) {
      const  email = this.signinForm.value.email;
      const password = this.signinForm.value.password;
      this.authservice.login(email, password, "customer").subscribe(
        (response: any) => {
          // If login is successful, navigate to the dashboard
          this.router.navigate(['/customer/dashboard']);
        },
        (error) => {
          // Handle any errors here, like showing a message to the user
          console.error('Login failed', error);
          alert('Login failed: ' + error);  // You can replace this with a user-friendly message
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
