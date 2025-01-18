import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-addleads',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addleads.component.html',
  styleUrl: './addleads.component.scss'
})
export class AddleadsComponent {
  leadForm: FormGroup;
  formFields = [
    // General Information Section
    { section: 'General Information', id: 'full-name', label: 'Full Name', type: 'text', inputType: 'text', controlName: 'fullName', placeholder: 'Enter name', errorMessage: '' },
    { section: 'General Information', id: 'gender', label: 'Gender', type: 'select', controlName: 'gender', placeholder: 'Please select one option', options: ['Male', 'Female'], errorMessage: '' },
    { section: 'General Information', id: 'dob', label: 'Date of Birth', type: 'date', inputType: 'date', controlName: 'dob', placeholder: 'DD / MM / YYYY', errorMessage: '' },
    { section: 'General Information', id: 'marital-status', label: 'Marital Status', type: 'select', controlName: 'maritalStatus', placeholder: 'Please select one option', options: ['Single', 'Married'], errorMessage: '' },
    { section: 'General Information', id: 'email', label: 'Your Email ID', type: 'email', inputType: 'email', controlName: 'email', placeholder: 'Report will be sent here', errorMessage: '' },
    { section: 'General Information', id: 'mobile', label: 'Mobile No', type: 'text', inputType: 'text', controlName: 'mobile', placeholder: 'Enter Mobile Number', errorMessage: 'Enter a valid 10-digit mobile number.' },
    { section: 'General Information', id: 'alt-mobile', label: 'Alternate Mobile No', type: 'text', inputType: 'text', controlName: 'altMobile', placeholder: 'Enter Alternate Mobile Number', errorMessage: 'Enter a valid 10-digit mobile number.' },
    { section: 'General Information', id: 'pan', label: 'PAN Number', type: 'text', inputType: 'text', controlName: 'pan', placeholder: 'For eg: ESKPL2389K', errorMessage: 'Enter a valid PAN number (e.g., ESKPL2389K).' },
    { section: 'General Information', id: 'aadhaar', label: 'Aadhaar / VID Number', type: 'text', inputType: 'text', controlName: 'aadhaar', placeholder: 'Enter 12 digit aadhaar number', errorMessage: 'Enter a valid 12-digit Aadhaar number.' },
     
    // Address Section
    { section: 'Address', id: 'permanent-address', label: 'Permanent Address', type: 'text', inputType: 'text', controlName: 'permanentAddress', placeholder: 'Mandatory', errorMessage: 'Permanent address is required.' },
    { section: 'Address', id: 'permanent-pincode', label: 'Permanent Pincode', type: 'text', inputType: 'text', controlName: 'permanentPincode', placeholder: 'Enter locality pincode', errorMessage: 'Pincode is required.' },
    { section: 'Address', id: 'permanent-state', label: 'Permanent State', type: 'text', inputType: 'text', controlName: 'permanentState', placeholder: 'State will be based on your pincode', errorMessage: '' },
    { section: 'Address', id: 'permanent-city', label: 'Permanent City', type: 'text', inputType: 'text', controlName: 'permanentCity', placeholder: 'City will be based on your pincode', errorMessage: '' },
    { section: 'Address', id: 'current-address', label: 'Current Address', type: 'text', inputType: 'text', controlName: 'currentAddress', placeholder: 'Mandatory', errorMessage: 'Current address is required.' },
    { section: 'Address', id: 'current-pincode', label: 'Current Pincode', type: 'text', inputType: 'text', controlName: 'currentPincode', placeholder: 'Enter locality pincode', errorMessage: 'Pincode is required.' },
    { section: 'Address', id: 'current-state', label: 'Current State', type: 'text', inputType: 'text', controlName: 'currentState', placeholder: 'State will be based on your pincode', errorMessage: '' },
    { section: 'Address', id: 'current-city', label: 'Current City', type: 'text', inputType: 'text', controlName: 'currentCity', placeholder: 'City will be based on your pincode', errorMessage: '' },
    { section: 'Address', id: 'current-address-same', label: 'Current Address Same as Permanent Address', type: 'checkbox', controlName: 'isCurrentSameAsPermanent', errorMessage: '' },
    
    // Professional Information Section
    { section: 'Professional Information', id: 'employment-type', label: 'Type of Employment', type: 'select', controlName: 'employmentType', placeholder: 'Please select one option', options: ['Self-Employed', 'Salaried'], errorMessage: '' },
    { section: 'Professional Information', id: 'company-name', label: 'Company Name', type: 'text', inputType: 'text', controlName: 'companyName', placeholder: 'Enter company name', errorMessage: 'Company name is required.' },
    { section: 'Professional Information', id: 'monthly-income', label: 'Monthly Income', type: 'text', inputType: 'number', controlName: 'monthlyIncome', placeholder: 'Enter your average net monthly income', errorMessage: 'Monthly income is required.' },
    { section: 'Professional Information', id: 'official-mail', label: 'Official Mail ID', type: 'email', inputType: 'email', controlName: 'officialMail', placeholder: 'e.g. vivek@easiloan.com', errorMessage: 'Enter a valid official email.' },
    { section: 'Professional Information', id: 'work-experience', label: 'Overall Work Experience (in years)', type: 'text', inputType: 'number', controlName: 'workExperience', placeholder: 'Enter total experience in years', errorMessage: 'Work experience is required.' },
    { section: 'Professional Information', id: 'existing-emis', label: 'Existing EMIs (Specify Amount)', type: 'text', inputType: 'number', controlName: 'existingEMIs', placeholder: 'Enter your existing monthly EMIs', errorMessage: '' },
    { section: 'Professional Information', id: 'annual-income', label: 'Annual Income', type: 'text', inputType: 'number', controlName: 'annualIncome', placeholder: 'Enter your annual income', errorMessage: 'Annual income is required.' },
    { section: 'Professional Information', id: 'annual-profit', label: 'Annual Profit', type: 'text', inputType: 'number', controlName: 'annualProfit', placeholder: 'Turnover of last financial year', errorMessage: '' },
    
    // Loan Requirements Section
    { section: 'Loan Requirements', id: 'loan-product', label: 'Product', type: 'select', controlName: 'loanProduct', placeholder: 'Please select one option', options: ['Home Loan', 'Personal Loan'], errorMessage: '' },
    { section: 'Loan Requirements', id: 'loan-amount', label: 'Amount Required', type: 'text', inputType: 'number', controlName: 'loanAmount', placeholder: 'Enter amount required', errorMessage: 'Loan amount is required.' },
    { section: 'Loan Requirements', id: 'loan-tenure', label: 'Loan Tenure', type: 'text', inputType: 'number', controlName: 'loanTenure', placeholder: 'Enter loan tenure in years', errorMessage: '' },
    
    // Property Details Section
      // {
      //   section: 'Property Details',
      //   id: 'property-identified',
      //   label: 'Is Property Identified?',
      //   type: 'select',
      //   controlName: 'propertyIdentified',
      //   placeholder: 'Please select one option',
      //   options: ['Yes', 'No'],
      //   errorMessage: ''
      // },
      // {
      //   section: 'Property Details',
      //   id: 'project-name',
      //   label: 'Project Name',
      //   type: 'text',
      //   controlName: 'projectName',
      //   placeholder: 'Enter project name',
      //   errorMessage: 'Project Name is required'
      // },
      // {
      //   section: 'Property Details',
      //   id: 'developer-name',
      //   label: 'Developer Name',
      //   type: 'text',
      //   controlName: 'developerName',
      //   placeholder: 'Enter developer\'s name',
      //   errorMessage: 'Developer Name is required'
      // },
      // {
      //   section: 'Property Details',
      //   id: 'booking-date',
      //   label: 'Booking Date',
      //   type: 'date',
      //   controlName: 'bookingDate',
      //   placeholder: 'DD / MM / YYYY',
      //   errorMessage: 'Booking Date is required'
      // },
      // {
      //   section: 'Property Details',
      //   id: 'typology',
      //   label: 'Typology',
      //   type: 'select',
      //   controlName: 'typology',
      //   placeholder: 'Please select one option',
      //   options: ['Apartment', 'Villa', 'Plot'],
      //   errorMessage: ''
      // },
      // {
      //   section: 'Property Details',
      //   id: 'stage-of-construction',
      //   label: 'Stage of Construction',
      //   type: 'select',
      //   controlName: 'stageOfConstruction',
      //   placeholder: 'Please select one option',
      //   options: ['Under Construction', 'Ready to Move'],
      //   errorMessage: ''
      // },
      // {
      //   section: 'Property Details',
      //   id: 'property-value',
      //   label: 'Property Value',
      //   type: 'text',
      //   controlName: 'propertyValue',
      //   placeholder: 'Enter property value',
      //   errorMessage: 'Property Value must be greater than 0'
      // },
      // {
      //   section: 'Property Details',
      //   id: 'pincode',
      //   label: 'Pincode',
      //   type: 'text',
      //   controlName: 'pincode',
      //   placeholder: 'Enter locality pincode',
      //   errorMessage: 'Pincode is required'
      // },
      // {
      //   section: 'Property Details',
      //   id: 'state',
      //   label: 'State',
      //   type: 'text',
      //   controlName: 'state',
      //   placeholder: 'State will be based on your pincode',
      //   errorMessage: ''
      // },
      // {
      //   section: 'Property Details',
      //   id: 'city',
      //   label: 'City',
      //   type: 'text',
      //   controlName: 'city',
      //   placeholder: 'City will be based on your pincode',
      //   errorMessage: ''
      // },
    // Documents Section
{ section: 'Documents', id: 'pan-card', label: 'PAN Card', type: 'file', controlName: 'panCardDoc', errorMessage: 'PAN Card document is required.' },
{ section: 'Documents', id: 'aadhaar-card', label: 'Aadhaar Card', type: 'file', controlName: 'aadhaarCardDoc', errorMessage: 'Aadhaar Card document is required.' },
{ section: 'Documents', id: 'salary-slips', label: 'Last 3 Months Salary Slips', type: 'file', controlName: 'salarySlips', errorMessage: 'Salary slips are required.' },
{ section: 'Documents', id: 'bank-statements', label: 'Bank Statements', type: 'file', controlName: 'bankStatements', errorMessage: 'Bank statements are required.' },
{ section: 'Documents', id: 'form-16', label: 'Form 16', type: 'file', controlName: 'form16', errorMessage: 'Form 16 is required.' },
    // Other Section
    { section: 'Other', id: 'closing-manager', label: 'Closing Manager', type: 'text', inputType: 'text', controlName: 'closingManager', placeholder: 'Enter name of closing manager', errorMessage: 'Closing manager name is required.' }
  ];
  

  constructor(private fb: FormBuilder) {
    this.leadForm = this.fb.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      altMobile: ['', Validators.pattern('^[0-9]{10}$')],
      pan: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      aadhaar: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      permanentAddress: ['', Validators.required],
      permanentPincode: ['', Validators.required],
      permanentState: [''],
      permanentCity: [''],
      currentAddress: ['', Validators.required],
      currentPincode: ['', Validators.required],
      currentState: [''],
      currentCity: [''],
      isCurrentSameAsPermanent: [false],
      employmentType: ['', Validators.required],
      companyName: ['', Validators.required],
      monthlyIncome: ['', Validators.required],
      officialMail: ['', [Validators.required, Validators.email]],
      workExperience: ['', Validators.required],
      existingEMIs: [''],
      annualIncome: ['', Validators.required],
      annualProfit: [''],
      loanProduct: ['', Validators.required],
      loanAmount: ['', Validators.required],
      loanTenure: [''],
      // propertyIdentified: ['No', Validators.required],
      // projectName: [''],
      // developerName: [''],
      // bookingDate: [''],
      // typology: [''],
      // stageOfConstruction: [''],
      // propertyValue: [''],
      // pincode: [''],
      // state: [''],
      // city: [''],
      panCardDoc: ['', Validators.required],
    aadhaarCardDoc: ['', Validators.required],
    salarySlips: ['', Validators.required],
    bankStatements: ['', Validators.required],
    form16: ['', Validators.required],
      closingManager: ['', Validators.required]
    });
  
  }  

  onSubmit() {
    if (this.leadForm.valid) {
      console.log('Form Submitted', this.leadForm.value);
    } else {
      console.log('Form Invalid');
    }
  }

  getUniqueSections(): string[] {
    // Get unique sections from formFields
    return [...new Set(this.formFields.map((field) => field.section))];
  }
  
  getFieldsBySection(section: string): any[] {
    // Filter formFields by section
    return this.formFields.filter((field) => field.section === section);
  }
  
  onCancel() {
    // Perform the desired action on cancel
    console.log('Cancel button clicked');
    // Example: Navigate back or reset the form
    this.leadForm.reset();
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.leadForm.get(controlName)?.setValue(file);
      
      // Get the upload box element
      const uploadBox = event.target.parentElement;
      const uploadText = uploadBox.querySelector('.upload-text');
      if (uploadText) {
        uploadText.textContent = file.name;
      }
    }
  }
  

}
