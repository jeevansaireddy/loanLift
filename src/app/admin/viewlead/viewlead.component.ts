import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeadserviceService } from '../../services/leadservice.service';
import { EditleadsComponent } from '../../partner/editleads/editleads.component';
import { PincodeService } from '../../pincode.service';


interface UploadedFile {
  name: string;
  path: string;
}

@Component({
  selector: 'app-viewlead',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './viewlead.component.html',
  styleUrl: './viewlead.component.scss'
})
export class ViewleadComponent extends EditleadsComponent {
  isEditMode = false;

  constructor(
    fb: FormBuilder, 
    router: Router, 
    leadser: LeadserviceService, 
    route: ActivatedRoute,
    pincodeService: PincodeService
  ) {
    super(fb, router, leadser, route, pincodeService );
  }

  override loadLeadData() {
    super.loadLeadData();
    if (!this.isEditMode) {
      // Disable all form controls in view mode
      Object.keys(this.leadForm.controls).forEach(key => {
        if (!this.isEditMode) {
          this.leadForm.get(key)?.disable();
        }
      });
    } else {
      // enable all controls when exiting edit mode
      Object.keys(this.leadForm.controls).forEach(key => {
        this.leadForm.get(key)?.enable();
      });
      this.loadLeadData(); // Reset to original data
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
      this.loadLeadData(); // Reset to original data when exiting edit mode
  }

  getDisplayValue(field: any): string {
    const value = this.leadForm.get(field.controlName)?.value.disabled;
    
    if (field.type === 'select') {
      return value || 'Not specified';
    } else if (field.type === 'checkbox') {
      return value ? 'Yes' : 'No';
    } else if (field.type === 'date') {
      return value ? new Date(value).toLocaleDateString() : 'Not specified';
    } else {
      return value || 'Not specified';
    }
  }

  
  override onSubmit() {
    if (this.isEditMode) {
        if (this.leadForm.valid) {
          const formData = new FormData();
          
          // Append regular form values
          Object.keys(this.leadForm.value).forEach(key => {
            if (this.uploadedFiles[key]) {
              // Append files with index
              this.uploadedFiles[key].forEach((file, index) => {
                formData.append(`${key}`, file);
              });
            } else {
              // Append regular form values
              formData.append(key, this.leadForm.value[key]);
            }
          });
    
          console.log('Form Submitted with files');
          this.leadser.updateLoanApplication(this.itemId,formData).subscribe(message=>
            {console.log(message);
              if(message.success === true){
                alert('Lead Updated Successfully');
                this.router.navigate(['/admin/dashboard']);
              }
    
            }
            );
      }
    }
  }

  override onCancel() {
    // Example: Navigate back or reset the form
    this.router.navigate(['/admin/dashboard']);
  }
}