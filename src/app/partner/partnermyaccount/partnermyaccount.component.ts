import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountserviceService } from '../../services/accountservice.service';

@Component({
  selector: 'app-partnermyaccount',
  standalone: true,
  imports: [[CommonModule, ReactiveFormsModule]],
  templateUrl: './partnermyaccount.component.html',
  styleUrl: './partnermyaccount.component.scss'
})
export class PartnermyaccountComponent {
  activeTab = 'company';
  companyForm!: FormGroup;
  isEditMode = false;
  savedData: any = null;
  id: any;


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

  constructor(private fb: FormBuilder, private router: Router, private myaccountservice: AccountserviceService) {
    this.initializeForm();

    const currentUser = localStorage.getItem('currentUser');

    // If the 'currentUser' is not found or the role is not 'admin', redirect to the login page
    if (!currentUser || JSON.parse(currentUser).role !== 'partner') {
      this.router.navigate(['/admin/login']);
    }
    
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
    // Load saved data if availabl
      this.myaccountservice.getMyAccountDetails().subscribe((response)=>{
        console.log(response);
        this.companyForm.patchValue({
          id: response.data.id,
          corporateName: response.data.corporate_name,
          companyPan: response.data.company_name,
          gstin: response.data.gstin,
          companyAddress: response.data.company_address,
          pincode: response.data.pincode,
          state: response.data.state,
          city: response.data.city
        });
        this.id = response.data.id;
      })
      this.isEditMode = false;
      this.disableForm();  // Disable form if there's saved data
    
  }


  setActiveTab(tab: string) {
    this.activeTab = tab;
  }


   checkFormHasData(form: FormGroup): boolean {
        // Option 1: Check if form is valid and has values
        if (form.valid) {
          return Object.values(form.controls).some(control => 
            control.value !== null && 
            control.value !== '' && 
            control.value !== undefined
          );
        }
        return false;
  
      }
    
      onSubmit() {
  
        if(!this.checkFormHasData(this.companyForm)){
        if (this.companyForm.valid) {
          this.myaccountservice.postMyAccountDetails(this.companyForm).subscribe(response => {
            if (response) {
              alert('Lead added successfully');
            }
          });
        }} else {
          if (this.companyForm.valid) {
            this.myaccountservice.updateMyAccountDetails(this.companyForm, this.id).subscribe(response => {
              if(response) {
                alert('Lead updated successfully');
              }
            })
          }
    
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
  if (this.checkFormHasData(this.companyForm)) {
    console.log(this.checkFormHasData(this.companyForm));
    this.isEditMode = false;
    this.disableForm();  // Disable form after discarding changes
  } else {
    this.companyForm.reset();
  }
}

  

  
}
