import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partnermyaccount',
  standalone: true,
  imports: [[CommonModule, ReactiveFormsModule, RouterLink]],
  templateUrl: './partnermyaccount.component.html',
  styleUrl: './partnermyaccount.component.scss'
})
export class PartnermyaccountComponent {
  activeTab = 'company';
  companyForm!: FormGroup;
  isEditMode = true;
  savedData: any = null;


  validationMessages = {
    corporateName: {
      required: 'Corporate name is required'
    },
    companyPan: {
      required: 'Company PAN is required',
      pattern: 'Invalid PAN format. Should be like ABCDE1234F'
    },
    gstin: {
      required: 'GSTIN is required',
      pattern: 'Invalid GSTIN format. Should be like 27ABCDE1234F1Z5'
    },
    companyAddress: {
      required: 'Company address is required'
    },
    pincode: {
      required: 'Pincode is required',
      pattern: 'Pincode should be 6 digits'
    }
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.initializeForm();
  }

  disableForm() {
    Object.keys(this.companyForm.controls).forEach(key => {
      const control = this.companyForm.get(key);
      if (control) {
        control.disable();
      }
    });
  }
  onLogout() {
    // Clear any stored data
    localStorage.clear();
    // Navigate to login page
    this.router.navigate(['/partner/login']);
  }

  enableForm() {
    Object.keys(this.companyForm.controls).forEach(key => {
      const control = this.companyForm.get(key);
      if (control) {
        control.enable();
      }
    });
  }

  initializeForm() {
    this.companyForm = this.fb.group({
      corporateName: [{value: '', disabled: !this.isEditMode}, Validators.required],
      companyPan: [{value: '', disabled: !this.isEditMode}, [
        Validators.required, 
        Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')
      ]],
      gstin: [{value: '', disabled: !this.isEditMode}, [
        Validators.required,
        Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
      ]],
      companyAddress: [{value: '', disabled: !this.isEditMode}, Validators.required],
      pincode: [{value: '', disabled: !this.isEditMode}, [
        Validators.required,
        Validators.pattern('^[0-9]{6}$')
      ]],
      state: [{value: '', disabled: !this.isEditMode}, Validators.required],
      city: [{value: '', disabled: !this.isEditMode}, Validators.required],
    });
  }

  ngOnInit() {
    // Load saved data if available
    const savedData = localStorage.getItem('companyDetails');
    if (savedData) {
      this.savedData = JSON.parse(savedData);
      this.loadSavedData();
      this.isEditMode = false;
      this.disableForm();  // Disable form if there's saved data
    }
  }

  loadSavedData() {
    if (this.savedData) {
      Object.keys(this.savedData).forEach(key => {
        const control = this.companyForm.get(key);
        if (control) {
          control.patchValue(this.savedData[key]);
        }
      });
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }


  onSubmit() {
    if (this.companyForm.valid) {
      this.savedData = this.companyForm.getRawValue();
      localStorage.setItem('companyDetails', JSON.stringify(this.savedData));
      this.isEditMode = false;
      this.disableForm();  // Disable all fields after saving
    }
  }

  onEdit() {
    this.isEditMode = true;
    this.enableForm();  // Enable all fields when entering edit mode
  }

  getErrorMessage(fieldName: string): string {
    const control = this.companyForm.get(fieldName);
    if (control && control.errors && (control.dirty || control.touched)) {
      const errors = Object.keys(control.errors);
      if (errors.length > 0) {
        const firstError = errors[0];
        return this.validationMessages[fieldName as keyof typeof this.validationMessages][firstError as keyof (typeof this.validationMessages)[keyof typeof this.validationMessages]];
      }
    }
    return '';
  }

  // Check if field has error
  hasError(fieldName: string): boolean {
    const control = this.companyForm.get(fieldName);
    return !!(control && control.errors && (control.dirty || control.touched));
  }


  
onDiscard() {
  if (this.savedData) {
    this.loadSavedData();
    this.isEditMode = false;
    this.disableForm();  // Disable form after discarding changes
  } else {
    this.companyForm.reset();
  }
}

  

  
}
