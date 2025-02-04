import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardserviceService } from '../../services/dashboardservice.service';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Import to check platform
import { LeadserviceService } from '../../services/leadservice.service';
import { FormsModule } from '@angular/forms';
import { PartnerLoanApplicationFilterComponent } from '../partner-loan-application-filter/partner-loan-application-filter.component';

export interface LoanApplication {
  application_id: number;
  applicant_name: string;
  loan_amount: number;
  loan_status: string;
  disbursed_amount: string;
  modified_at: string;
  name_of_closing_agent: string;
}

@Component({
  selector: 'app-partnerdashboard',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, FormsModule, PartnerLoanApplicationFilterComponent],
  templateUrl: './partnerdashboard.component.html',
  styleUrl: './partnerdashboard.component.scss',
})
export class PartnerdashboardComponent {

  loanapplications: LoanApplication[] =[];
  totalLeads: any = 0 ;
  bankRejected: any = 0;
  bankApproved: any = 0;
  disbursedAmount: any =0;

  searchQuery: string = ''; // The value to search for
  filteredApplications: any[] = []; // This will store filtered data

  constructor(
    private router: Router, 
    private dashboardService: DashboardserviceService,
    private leadService: LeadserviceService,
  ) {
    const currentUser = localStorage.getItem('currentUser');

    // If the 'currentUser' is not found or the role is not 'admin', redirect to the login page
    if (!currentUser || JSON.parse(currentUser).role !== 'partner') {
      this.router.navigate(['/admin/login']);
    }
    
    this.loadPartnerLoanApplications();
    
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
       this.disbursedAmount = applications.reduce((sum, app) => sum + (parseFloat(app.disbursed_amount) || 0), 0);
     }
   
     // Existing methods for table interactions
     filterApplications() {
       this.filteredApplications = this.loanapplications.filter(app => 
         app.applicant_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
         app.name_of_closing_agent.toLowerCase().includes(this.searchQuery.toLowerCase())
       );
       this.updateStatistics();
     }



  loadPartnerLoanApplications(): void {
    this.leadService.getLoanApplications().subscribe(
      (response: any) => {
        this.loanapplications = response.applications_summary;
        console.log(this.loanapplications);
        this.updateStatistics();
        this.filterApplications();

      },
      (error) => {
        console.error('Error fetching partner loan applications:', error);
      }
    )
  }

  onLogout() {
   
      localStorage.clear(); 
    
    // Navigate to login page
    this.router.navigate(['/partner/login']);
  }

  editRow(itemId: number) {
    this.router.navigate(['/partner/editlead', itemId]);
  }

  
  deleteRow(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.leadService.deleteLoanApplication(id).subscribe(
        (response: any) => {
          console.log('Loan application deleted:', response);
        },
        (error) => {
          console.error('Error deleting loan application:', error);
        }
      );
      this.loanapplications = this.loanapplications.filter(row => row.application_id!== id);
      this.updateStatistics();
    }
  }







}