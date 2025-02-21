import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink} from '@angular/router';
import { LeadserviceService } from '../../services/leadservice.service';
import { PincodeService } from '../../pincode.service';


@Component({
  selector: 'app-addleads',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './addleads.component.html',
  styleUrl: './addleads.component.scss'
})
export class AddleadsComponent {
  leadForm: FormGroup;
  uploadedFiles: { [key: string]: File[] } = {
    panCardDoc: [],
    aadhaarCardDoc: [],
    salarySlips: [],
    bankStatements: [],
    form16: []
  };
  
  formFields = [
    // General Information Section
    { section: 'General Information', id: 'full-name', label: 'Full Name', type: 'text', inputType: 'text', controlName: 'fullName', placeholder: 'Enter name', errorMessage: '' },
    { section: 'General Information', id: 'gender', label: 'Gender', type: 'select', controlName: 'gender', placeholder: 'Please select one option', options: ['Male', 'Female'], errorMessage: '' },
    { section: 'General Information', id: 'dob', label: 'Date of Birth', type: 'date', inputType: 'date', controlName: 'dob', placeholder: 'DD / MM / YYYY', errorMessage: '' },
    { section: 'General Information', id: 'marital-status', label: 'Marital Status', type: 'select', controlName: 'maritalStatus', placeholder: 'Please select one option', options: ['Single', 'Married'], errorMessage: '' },
    { section: 'General Information', id: 'email', label: 'Your Email ID', type: 'email', inputType: 'email', controlName: 'email', placeholder: 'Report will be sent here', errorMessage: '' },
    { section: 'General Information', id: 'mobile', label: 'Mobile No', type: 'text', inputType: 'number', controlName: 'mobile', placeholder: 'Enter Mobile Number', errorMessage: 'Enter a valid 10-digit mobile number.' },
    { section: 'General Information', id: 'alt-mobile', label: 'Alternate Mobile No', type: 'text', inputType: 'number', controlName: 'altMobile', placeholder: 'Enter Alternate Mobile Number', errorMessage: 'Enter a valid 10-digit mobile number.' },
    { section: 'General Information', id: 'pan', label: 'PAN Number', type: 'text', inputType: 'text', controlName: 'pan', placeholder: 'For eg: ESKPL2389K', errorMessage: 'Enter a valid PAN number (e.g., ESKPL2389K).' },
    { section: 'General Information', id: 'aadhaar', label: 'Aadhaar / VID Number', type: 'text', inputType: 'number', controlName: 'aadhaar', placeholder: 'Enter 12 digit aadhaar number', errorMessage: 'Enter a valid 12-digit Aadhaar number.' },
     
    // Address Section
    { section: 'Address', id: 'current-address', label: 'Current Address', type: 'text', inputType: 'text', controlName: 'currentAddress', placeholder: 'Mandatory', errorMessage: 'Current address is required.' },
    { section: 'Address', id: 'current-pincode', label: 'Current Pincode', type: 'text', inputType: 'number', controlName: 'currentPincode', placeholder: 'Enter locality pincode', errorMessage: 'Enter a valid pincode.' },
    { section: 'Address', id: 'current-state', label: 'Current State', type: 'text', inputType: 'text', controlName: 'currentState', placeholder: 'State will be based on your pincode', errorMessage: '' },
    { section: 'Address', id: 'current-city', label: 'Current City', type: 'text', inputType: 'text', controlName: 'currentCity', placeholder: 'City will be based on your pincode', errorMessage: '' },
    
    // Professional Information Section
    { section: 'Professional Information', id: 'employment-type', label: 'Type of Employment', type: 'select', controlName: 'employmentType', placeholder: 'Please select one option', options: ['Self-Employed', 'Salaried'], errorMessage: '' },
    { section: 'Professional Information', id: 'company-name', label: 'Company Name', type: 'text', inputType: 'text', controlName: 'companyName', placeholder: 'Enter company name', errorMessage: 'Company name is required.' },
    { section: 'Professional Information', id: 'monthly-income', label: 'Monthly Income', type: 'text', inputType: 'number', controlName: 'monthlyIncome', placeholder: 'Enter your average net monthly income', errorMessage: 'Monthly income is required.' },
    { section: 'Professional Information', id: 'official-mail', label: 'Official Mail ID', type: 'email', inputType: 'email', controlName: 'officialMail', placeholder: 'e.g. mohan@loanlift.com', errorMessage: 'Enter a valid official email.' },
    { section: 'Professional Information', id: 'work-experience', label: 'Overall Work Experience (in years)', type: 'text', inputType: 'number', controlName: 'workExperience', placeholder: 'Enter total experience in years', errorMessage: 'Work experience is required.' },
    { section: 'Professional Information', id: 'existing-emis', label: 'Existing EMIs (Specify Amount)', type: 'text', inputType: 'number', controlName: 'existingEMIs', placeholder: 'Enter your existing monthly EMIs', errorMessage: '' },
    { section: 'Professional Information', id: 'annual-income', label: 'Annual Income', type: 'text', inputType: 'number', controlName: 'annualIncome', placeholder: 'Enter your annual income', errorMessage: 'Annual income is required.' },
    { section: 'Professional Information', id: 'annual-profit', label: 'Annual Profit', type: 'text', inputType: 'number', controlName: 'annualProfit', placeholder: 'Turnover of last financial year', errorMessage: '' },
    
    // Loan Requirements Section
    { section: 'Loan Requirements', id: 'loan-product', label: 'Product', type: 'select', controlName: 'loanProduct', placeholder: 'Please select one option', options: ['Home Loan', 'Personal Loan'], errorMessage: '' },
    { section: 'Loan Requirements', id: 'loan-amount', label: 'Amount Required', type: 'text', inputType: 'number', controlName: 'loanAmount', placeholder: 'Enter amount required', errorMessage: 'Loan amount is required.' },
    { section: 'Loan Requirements', id: 'loan-tenure', label: 'Loan Tenure', type: 'text', inputType: 'number', controlName: 'loanTenure', placeholder: 'Enter loan tenure in years', errorMessage: '' },
  
    // Documents Section
{ section: 'Documents', id: 'pan-card', label: 'PAN Card', type: 'file', controlName: 'panCardDoc', errorMessage: 'PAN Card document is required.' },
{ section: 'Documents', id: 'aadhaar-card', label: 'Aadhaar Card', type: 'file', controlName: 'aadhaarCardDoc', errorMessage: 'Aadhaar Card document is required.' },
{ section: 'Documents', id: 'salary-slips', label: 'Last 3 Months Salary Slips', type: 'file', controlName: 'salarySlips', errorMessage: 'Salary slips are required.' },
{ section: 'Documents', id: 'bank-statements', label: 'Bank Statements', type: 'file', controlName: 'bankStatements', errorMessage: 'Bank statements are required.' },
{ section: 'Documents', id: 'form-16', label: 'Form 16', type: 'file', controlName: 'form16', errorMessage: 'Form 16 is required.' },
    // Project Section
    { section: 'Project details', id: 'project-name', label: 'Project Name', type: 'text', inputType: 'text', controlName: 'projectName', placeholder: 'Enter name of Project', errorMessage: 'Project name is required.' },
    { section: 'Project details', id: 'flat_no', label: 'Flat No', type: 'text', inputType: 'text', controlName: 'flatNo', placeholder: 'Enter Flat No', errorMessage: 'Flat No is required.' },
    { section: 'Project details', id: 'block_no', label: 'Block No', type: 'text', inputType: 'text', controlName: 'blockNo', placeholder: 'Enter Block No', errorMessage: 'Block No is required.' }


  ];

  ngOnInit() {
    // Listen for pincode changes
    this.leadForm.get('currentPincode')?.valueChanges.subscribe((pincode: string) => {
      if (pincode && this.leadForm.get('currentPincode')?.valid) {
          if (pincode.length === 6) {
              this.pincodeService.getCityAndStateByPincode(pincode).subscribe({
                  next: (response) => {
                      console.log('API Response:', response);
                      if (response.Status === 'Success' && response.PostOffice.length > 0) {
                          const postOffice = response.PostOffice[0];
                          this.leadForm.patchValue({
                              currentCity: postOffice.Division,
                              currentState: postOffice.State
                          });
                      } else {
                          this.leadForm.patchValue({
                              currentCity: '',
                              currentState: ''
                          });
                      }
                  },
                  error: (error) => {
                      console.error('API Error:', error);
                      this.leadForm.patchValue({
                          currentCity: '',
                          currentState: ''
                      });
                  }
              });
          }
      }
    });
  }
  

  constructor(private fb: FormBuilder, private router: Router, private leadService: LeadserviceService, public pincodeService: PincodeService) {
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
      currentAddress: ['', Validators.required],
      currentPincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      currentState: ['', Validators.required],
      currentCity: ['', Validators.required],
      employmentType: ['', Validators.required],
      companyName: ['', Validators.required],
      monthlyIncome: ['', Validators.required],
      officialMail: ['', [Validators.email, Validators.required]],
      workExperience: ['', Validators.required],
      existingEMIs: ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      annualIncome: ['', Validators.required],
      annualProfit: ['', Validators.required],
      loanProduct: ['', Validators.required],
      loanAmount: ['', Validators.required],
      loanTenure: ['', Validators.required],
      panCardDoc: [[]],
      aadhaarCardDoc: [[]],
      salarySlips: [[]],
      bankStatements: [[]],
      form16: [[]],
      projectName: ['', Validators.required],
      flatNo: ['', Validators.required],
      blockNo: ['', Validators.required],
    });




  
  }  


  fetchCityAndState(pincode: string) {
    if (pincode.length === 6) {
        this.pincodeService.getCityAndStateByPincode(pincode).subscribe({
            next: (response) => {
                console.log('API Response:', response);
                if (response.Status === 'Success' && response.PostOffice.length > 0) {
                    const postOffice = response.PostOffice[0];
                    this.leadForm.patchValue({
                        currentCity: postOffice.Division,
                        currentState: postOffice.State
                    });
                } else {
                    this.leadForm.patchValue({
                        currentCity: '',
                        currentState: ''
                    });
                }
            },
            error: (error) => {
                console.error('API Error:', error);
                this.leadForm.patchValue({
                    currentCity: '',
                    currentState: ''
                });
            }
        });
    }
}










  onLogout() {
    // Clear any stored data
    localStorage.clear();
    // Navigate to login page
    this.router.navigate(['/partner/login']);
  }

  getFiles(controlName: string): File[] {
    return this.uploadedFiles[controlName] || [];
  }

  getMaxFiles(controlName: string): number {
    return controlName === 'salarySlips' ? 3 : 1;
  }

  removeFile(controlName: string, event: Event, index: number) {
    event.stopPropagation();
    
    if (this.uploadedFiles[controlName]) {
      this.uploadedFiles[controlName].splice(index, 1);
      
      // Set form validation errors if no files remain
      if (this.uploadedFiles[controlName].length === 0) {
        this.leadForm.get(controlName)?.setErrors({ required: true });
      }
      
      this.leadForm.get(controlName)?.markAsTouched();
    }
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (!file) return;

    // Initialize array if it doesn't exist
    if (!this.uploadedFiles[controlName]) {
      this.uploadedFiles[controlName] = [];
    }

    const maxFiles = this.getMaxFiles(controlName);

    // Check if maximum files limit reached
    if (this.uploadedFiles[controlName].length >= maxFiles) {
      alert(`Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`);
      event.target.value = '';
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      this.leadForm.get(controlName)?.setErrors({
        fileSize: true
      });
      event.target.value = '';
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.leadForm.get(controlName)?.setErrors({
        fileType: true
      });
      event.target.value = '';
      return;
    }

    // Add file to array
    this.uploadedFiles[controlName].push(file);
    
    // Clear any previous errors
    if (this.uploadedFiles[controlName].length > 0) {
      this.leadForm.get(controlName)?.setErrors(null);
    }

    // Reset file input
    event.target.value = '';
    this.leadForm.get(controlName)?.markAsTouched();
  }

  getFileName(controlName: string): string {
    if (controlName === 'salarySlips') {
      return ''; // We'll handle payslip display separately
    }
    const control = this.leadForm.get(controlName);
    return control?.value || '';
  }
 

  onSubmit() {
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
      formData.delete('isCurrentSameAsPermanent');

      formData.forEach((value, key) => {
        console.log(key, value);
      });
     
      this.leadService.createLead(formData).subscribe(message=>{
        console.log(message);
        if( message['message'] === "Loan application successfully added!"){
          alert("Loan application created successfully");
          this.router.navigate(['/partner/dashboard']);
        }
      }
      );


      // Send formData to your API
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
    // Example: Navigate back or reset the form
    this.leadForm.reset();
  }
  }
