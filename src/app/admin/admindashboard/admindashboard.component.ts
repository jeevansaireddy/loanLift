import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { catchError, throwError } from 'rxjs';
import { DashboardserviceService } from '../../services/dashboardservice.service';
import { LeadserviceService } from '../../services/leadservice.service';
import { LoanApplicationFilterComponent } from '../loan-application-filter/loan-application-filter.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


export interface LoanApplication {
  application_id: number;
  applicant_name: string;
  role: string;
  loan_amount: number;
  loan_status: 'approved' | 'rejected' | 'in_progress';
  disbursed_amount: number;
  partner: string;
  modified_at: string;
  project_name: string;
  isEditing?: boolean;
  originalData?: any;
  payout: number;
  documents: {
    aadhar: { path: string; content: string } | null;
    pan_card: { path: string; content: string } | null;
    bank_statement: { path: string; content: string } | null;
    itr: { path: string; content: string } | null;
    salary_slips: Array<{ path: string; content: string }>;
  };
}

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, FormsModule, LoanApplicationFilterComponent],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdmindashboardComponent implements OnInit {
  loanapplications: LoanApplication[] = [];
  filteredApplications: LoanApplication[] = [];
  searchTerm: string = '';
  totalLeads: number = 0;
  bankRejected: number = 0;
  bankApproved: number = 0;
  disbursedAmount: number =0;
  loading: boolean = false;
  error: string | null = null;

  selectedPartner: string = '';
  selectedProject: string = '';
  selectedMonth: string = '';

  uniquePartners: string[] = [];
  uniqueProjects: string[] = [];

  constructor(
    private router: Router,
    private loanService: LeadserviceService
  ) {

    // Check if there's a 'currentUser' item in localStorage
    const currentUser = localStorage.getItem('currentUser');

    // If the 'currentUser' is not found or the role is not 'admin', redirect to the login page
    if (!currentUser || JSON.parse(currentUser).role !== 'admin') {
      this.router.navigate(['/admin/login']);
    }

    this.fetchApplications();

  }

  ngOnInit() {
    // this.loanapplications = [
    //   {
    //   application_id: 1,
    //   applicant_name: 'John Doe',
    //   loan_amount: 50000,
    //   loan_status: 'approved',
    //   disbursed_amount: '45000',
    //   developer_name: 'Dev1',
    //   documents: {
    //   aadhar: {
    //   path: '/documents/john_doe/aadhar.pdf',
    //   content: 'Aadhar card content'
    //   },
    //   pan_card: {
    //   path: '/documents/john_doe/pan.pdf',
    //   content: 'PAN card content'
    //   },
    //   bank_statement: {
    //   path: '/documents/john_doe/bank_statement.pdf',
    //   content: 'Bank statement content'
    //   },
    //   itr: {
    //   path: '/documents/john_doe/itr.pdf',
    //   content: 'ITR content'
    //   },
    //   salary_slips: [
    //   {
    //   path: '/documents/john_doe/salary_slip_jan.pdf',
    //   content: 'January salary slip'
    //   },
    //   {
    //   path: '/documents/john_doe/salary_slip_feb.pdf',
    //   content: 'February salary slip'
    //   }
    //   ]
    //   }
    //   },
    //   {
    //   application_id: 2,
    //   applicant_name: 'Jane Smith',
    //   loan_amount: 75000,
    //   loan_status: 'rejected',
    //   disbursed_amount: '0',
    //   developer_name: 'Dev2',
    //   documents: {
    //   aadhar: null,
    //   pan_card: {
    //   path: '/documents/jane_smith/pan.pdf',
    //   content: 'PAN card content'
    //   },
    //   bank_statement: null,
    //   itr: {
    //   path: '/documents/jane_smith/itr.pdf',
    //   content: 'ITR content'
    //   },
    //   salary_slips: []
    //   }
    //   },
    //   {
    //   application_id: 3,
    //   applicant_name: 'Bob Wilson',
    //   loan_amount: 100000,
    //   loan_status: 'in_progress',
    //   disbursed_amount: '95000',
    //   developer_name: 'Dev1',
    //   documents: {
    //   aadhar: {
    //   path: '/documents/bob_wilson/aadhar.pdf',
    //   content: 'Aadhar card content'
    //   },
    //   pan_card: null,
    //   bank_statement: {
    //   path: '/documents/bob_wilson/bank_statement.pdf',
    //   content: 'Bank statement content'
    //   },
    //   itr: null,
    //   salary_slips: [
    //   {
    //   path: '/documents/bob_wilson/salary_slip_mar.pdf',
    //   content: 'March salary slip'
    //   }
    //   ]
    //   }
    //   }
    //   ];
  }

 

  // View full form in a new page
  viewFullForm(applicationId: number) {
    // Navigate to the view form page with the application ID
    this.router.navigate(['/admin/viewlead', applicationId]);
  }

  // Toggle edit mode for a row
  toggleEdit(row: LoanApplication) {
    row.isEditing = true;
    // Store original data for cancel operation
    row.originalData = { ...row };
  }

  // Cancel editing and revert changes
  cancelEdit(row: LoanApplication) {
    if (row.originalData) {
      Object.assign(row, row.originalData);
    }
    row.isEditing = false;
    delete row.originalData;
  }

  // Save changes made to a row
  async saveChanges(applicationId: number, loan_status: string, disbursed_amount: number, payout_percentage: number, row: LoanApplication) {
    try {
      this.loading = true;
      // Make API call to save changes
       await this.loanService.updateLoanApplicationStatus(applicationId, loan_status, disbursed_amount, payout_percentage).toPromise();
      
      row.isEditing = false;
      delete row.originalData;
      
      // Show success message
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      this.loading = false;
    }
    this.updateStatistics();
  }

  private fetchApplications() {
    this.loading = true;
    this.error = null;

    this.loanService.getLoanApplications()
      .pipe(
        catchError(error => {
          this.error = 'Failed to fetch loan applications. Please try again later.';
          this.router.navigate(['/admin/login']);
          console.error('Error fetching loan applications:', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          if (Array.isArray(response.applications_summary)) {
            this.loanapplications = response.applications_summary.map((item: any) => ({
              ...this.mapToLoanApplication(item),
              isEditing: false
            }));
            this.filteredApplications = this.loanapplications;
            this.updateStatistics();
          } else {
            console.error('Unexpected API response format:', response);
            this.error = 'Received invalid data format from server';
          }
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });

    this.uniquePartners = [...new Set(this.loanapplications.map(app => app.partner))];
    this.uniqueProjects = [...new Set(this.loanapplications.map(app => app.project_name))];

  }

 

  extractMonth(date: string): string {
    // Assumes date is in a format like '2024-02-15'
    return date ? date.split('-')[1] : '';
  }

  
  

  private mapToLoanApplication(apiResponse: any): LoanApplication {
      // Helper function to map document data
      const mapDocument = (doc: any) => {
        if (!doc) return null;
        return {
          path: doc.path || '',
          content: doc.content || ''
        };
      };

      // Map salary slips array
      const mapSalarySlips = (slips: any[] = []) => {
        return slips.map(slip => ({
          path: slip.path || '',
          content: slip.content || ''
        }));
      };

      return {
        application_id: Number(apiResponse.application_id) || 0,
        role: String(apiResponse.created_by.role || ''),
        applicant_name: String(apiResponse.applicant_name || ''),
        loan_amount: Number(apiResponse.loan_amount) || 0,
        loan_status: apiResponse.loan_status,
        disbursed_amount: Number(apiResponse.disbursed_amount || 0),
        project_name: String(apiResponse.project_name|| ''),
        modified_at: String(apiResponse.modified_at || ''),
        partner: String(apiResponse.created_by.name || ''),
        payout: Number(apiResponse.payout_percentage || 0),
        // created_at: String(api)
        documents: {
          aadhar: mapDocument(apiResponse.documents?.aadhar),
          pan_card: mapDocument(apiResponse.documents?.pan_card),
          bank_statement: mapDocument(apiResponse.documents?.bank_statement),
          itr: mapDocument(apiResponse.documents?.itr),
          salary_slips: mapSalarySlips(apiResponse.documents?.salary_slips)
        }
      };
    }

   // Method to handle filtered applications from filter component
  onFilteredApplications(filteredApps: LoanApplication[]) {
    this.filteredApplications = filteredApps;
    this.updateStatistics(filteredApps);
  }

  // Update summary statistics based on filtered applications
  updateStatistics(applications: LoanApplication[] = this.filteredApplications) {
    this.totalLeads = applications.length;
    this.bankRejected = applications.filter(app => app.loan_status === 'rejected').length;
    this.bankApproved = applications.filter(app => app.loan_status === 'approved').length;
    this.disbursedAmount = applications.reduce((sum, app) => sum + (app.disbursed_amount || 0), 0);
  }

  // Existing methods for table interactions
  filterApplications() {
    this.filteredApplications = this.loanapplications.filter(app => 
      app.applicant_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      app.partner.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      app.project_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updateStatistics();
  }

    onLogout() {
      localStorage.clear();
      this.router.navigate(['/partner/login']);
    }
  
    editRow(itemId: number) {
      this.router.navigate(['/partner/editlead', itemId]);
    }


  
    deleteRow(id: number) {
      if (confirm('Are you sure you want to delete this record?')) {
        // Here you would typically make an API call to delete the record
        // After successful deletion:
        this.loanService.deleteLoanApplication(id).subscribe(
          (response: any) => {
            console.log('Loan application deleted:', response);
          },
          (error) => {
            console.error('Error deleting loan application:', error);
          }
        );
        this.loanapplications = this.loanapplications.filter(row => row.application_id !== id);
        this.filterApplications();
        this.updateStatistics();
      }
    }

    saveRow(row: LoanApplication) {
      this.loading = true;
      // Here you would typically make an API call to save the changes
      console.log('Saving row:', row);
      
      // Simulating API call completion
      setTimeout(() => {
        this.loading = false;
        alert('Changes saved successfully!');
      }, 500);
      this.updateStatistics();
    }

    getFileName(path: string): string {
      const fileName = path.split('/').pop();
      return fileName || 'document';
    }
  
    downloadDocument(content: string, path: string) {
      try {
        const fileName = this.getFileName(path);
        const byteCharacters = atob(content);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        
        saveAs(blob, fileName);
      } catch (error) {
        console.error('Error downloading document:', error);
        alert('Failed to download document. Please try again.');
      }
    }
  
    async downloadAllDocuments(documents: LoanApplication['documents']) {
      try {
        this.loading = true;
        const zip = new JSZip();
        
        // Add each document to zip if it exists
        if (documents.aadhar) {
          zip.file(this.getFileName(documents.aadhar.path), documents.aadhar.content, {base64: true});
        }
        if (documents.pan_card) {
          zip.file(this.getFileName(documents.pan_card.path), documents.pan_card.content, {base64: true});
        }
        if (documents.bank_statement) {
          zip.file(this.getFileName(documents.bank_statement.path), documents.bank_statement.content, {base64: true});
        }
        if (documents.itr) {
          zip.file(this.getFileName(documents.itr.path), documents.itr.content, {base64: true});
        }
        
        // Add salary slips
        documents.salary_slips.forEach((slip, index) => {
          zip.file(
            `salary_slip_${index + 1}_${this.getFileName(slip.path)}`, 
            slip.content, 
            {base64: true}
          );
        });
    
        // Generate and download zip
        const content = await zip.generateAsync({type: "blob"});
        saveAs(content, "documents.zip");
      } catch (error) {
        console.error('Error creating zip file:', error);
        alert('Failed to download documents. Please try again.');
      } finally {
        this.loading = false;
      }
    }

    onPayoutInput(event: Event) {
      const input = event.target as HTMLInputElement;
      // Remove non-numeric characters and parse the input as a number
      let value = input.value.replace(/[^0-9]/g, '');
    
      // Enforce 0-100 range
      if (value) {
        const numericValue = Math.min(100, Math.max(0, parseInt(value, 10)));
        input.value = numericValue.toString();
      } else {
        input.value = '0';
      }
    }
    


    // Optional: Add method to refresh data
    refreshData() {
      this.fetchApplications();
    }
}