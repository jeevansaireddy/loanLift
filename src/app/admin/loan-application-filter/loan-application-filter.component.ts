import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoanApplication } from '../admindashboard/admindashboard.component';

@Component({
  selector: 'app-loan-application-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './loan-application-filter.component.html',
  styleUrl: './loan-application-filter.component.scss'
})
export class LoanApplicationFilterComponent implements OnInit, OnChanges {

  @Input() loanApplications: LoanApplication[] = [];
  @Output() filteredApplicationsChange = new EventEmitter<LoanApplication[]>();

 
  // Filter properties
  selectedRole: string = '';
  selectedPartner: string = '';
  selectedProject: string = '';
  selectedStatus: string = '';
  selectedMonth: string = '';
  selectedYear: string = '';

  // Unique filter options
  uniqueRoles: string[] = [];
  uniquePartners: string[] = [];
  uniqueProjects: string[] = [];
  uniqueYears: number[] = [];

  months = [
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' }
  ];

  // Filtered and calculated properties
  filteredApplications: LoanApplication[] = [];
  totalDisbursedAmount: number = 0;
  averageLoanAmount: number = 0;

  ngOnInit() {
    this.updateUniqueFilters();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loanApplications']) {
      this.updateUniqueFilters();
    }
  }

  updateUniqueFilters() {
    // Debug logging
    console.log('Full loan applications:', this.loanApplications);

    // Ensure loanApplications is not empty before processing
    if (this.loanApplications && this.loanApplications.length > 0) {
      // Carefully filter out falsy and empty string values
      this.uniquePartners = [...new Set(
        this.loanApplications
          .map(app => app.partner)
          .filter(partner => partner && partner.trim() !== '')
      )];

      this.uniqueRoles = [...new Set(
        this.loanApplications
          .map(app => app.role)
          .filter(role => role && role.trim() !== '')
      )];

      this.uniqueProjects = [...new Set(
        this.loanApplications
          .map(app => app.project_name)
          .filter(project => project && project.trim() !== '')
      )];

      // Debug logging
      console.log('Unique Partners:', this.uniquePartners);
      console.log('Unique Projects:', this.uniqueProjects);

        // Get unique years from created_at dates
        this.uniqueYears = [...new Set(
          this.loanApplications
            .map(app => new Date(app.modified_at).getFullYear())
        )].sort((a, b) => b - a); // Sort years in descending order

      // Apply filters after updating unique options
      this.applyFilters();
    }
  }

  applyFilters() {
    this.filteredApplications = this.loanApplications.filter(app => {
      const createdDate = new Date(app.modified_at);
      const monthMatches = !this.selectedMonth || createdDate.getMonth().toString() === this.selectedMonth;
      const yearMatches = !this.selectedYear || createdDate.getFullYear().toString() === this.selectedYear;
      
      return (
        (!this.selectedPartner || app.partner === this.selectedPartner) &&
        (!this.selectedRole || app.role === this.selectedRole) &&
        (!this.selectedProject || app.project_name === this.selectedProject) &&
        (!this.selectedStatus || app.loan_status === this.selectedStatus) &&
        monthMatches &&
        yearMatches
      );
    });

    this.calculateStatistics();
    this.filteredApplicationsChange.emit(this.filteredApplications);
  }

  calculateStatistics() {
    this.totalDisbursedAmount = this.filteredApplications.reduce(
      (sum, app) => sum + (app.disbursed_amount || 0), 0
    );

    this.averageLoanAmount = this.filteredApplications.length > 0
      ? this.filteredApplications.reduce((sum, app) => sum + app.loan_amount, 0) 
        / this.filteredApplications.length
      : 0;
  }
}