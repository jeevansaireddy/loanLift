import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoanApplication } from '../customerdashboard/customerdashboard.component';

@Component({
  selector: 'app-customer-loan-application-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customer-loan-application-filter.component.html',
  styleUrl: './customer-loan-application-filter.component.scss'
})
export class CustomerLoanApplicationFilterComponent {

  
    @Input() loanApplications: LoanApplication[] = [];
    @Output() filteredApplicationsChange = new EventEmitter<LoanApplication[]>();
  
   
    // Filter properties
    selectedPartner: string = '';
    selectedProject: string = '';
    selectedStatus: string = '';
    selectedMonth: string = '';
    selectedYear: string = '';
  
    // Unique filter options
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
  
        this.uniqueProjects = [...new Set(
          this.loanApplications
            .map(app => app.name_of_closing_agent)
            .filter(project => project && project.trim() !== '')
        )];
  
        // Debug logging
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
          (!this.selectedProject || app.name_of_closing_agent === this.selectedProject) &&
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
        (sum, app) => sum + (Number(app.disbursed_amount) || 0), 0
      );
  
      this.averageLoanAmount = this.filteredApplications.length > 0
        ? this.filteredApplications.reduce((sum, app) => sum + app.loan_amount, 0) 
          / this.filteredApplications.length
        : 0;
    }
  






}
