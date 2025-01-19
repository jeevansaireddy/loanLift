import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient , HttpClientModule, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-partnerdashboard',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './partnerdashboard.component.html',
  styleUrl: './partnerdashboard.component.scss'
})
export class PartnerdashboardComponent {

  readonly BASE_URL = 'https://1b18-2405-201-c009-687f-adaa-a207-8ee6-4dbd.ngrok-free.app';
  totalLeads: any = 0 ;
  bankRejected: any = 0;
  bankApproved: any = 0;

  constructor(private router: Router, private http: HttpClient) { 
    // Check if user is logged in
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/partner/login']);
    }
    this.fetchPartnerLoanApplications();
  }

  fetchPartnerLoanApplications() {
    const bearerToken = localStorage.getItem('token'); // Replace with the actual bearer token

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${bearerToken}` 
    });

    this.http.get(this.BASE_URL+'/users/get_partner_loan_applications/', { headers })
      .subscribe(
        (response: any) => {
          this.totalLeads = response.applications_summary['IN-PROGRESS'];
          this.bankRejected = response.applications_summary['REJECTED'];
          this.bankApproved = response.applications_summary['ACTIVE'];
        },
        (error) => {
          console.error('Error fetching partner loan applications:', error);
        }
      );
  }

  onLogout() {
    // Clear any stored data
    localStorage.clear();
    // Navigate to login page
    this.router.navigate(['/partner/login']);
  }

}
