import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customerlogin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customerlogin.component.html',
  styleUrl: './customerlogin.component.scss'
})
export class CustomerloginComponent {
  signupForm: FormGroup;
    signinForm: FormGroup;
    isSignup = true;
    submitted = false; // Add this to track form submission attempts
  
    constructor(private fb: FormBuilder) {
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
      if (!this.isSigninFormInvalid()) {
        console.log('Signin form data:', this.signinForm.value);
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
