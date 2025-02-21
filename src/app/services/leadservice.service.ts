import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeadserviceService {
  private apiUrl = 'http://127.0.0.1:8000';

  // private apiUrl = 'https://www.loanlift.co.in';


  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const bearerToken = currentUser?.access_token;

    if (!bearerToken) {
      throw new Error('Authentication token not found');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    });
  }

  createLead(leadData: FormData): Observable<any> {
    try {
      const headers = this.getHeaders();
      return this.http.post(
        `${this.apiUrl}/users/add_loan_application/`, 
        leadData, 
        { headers }
      ).pipe(
        catchError(error => {
          const errorMessage = error.error instanceof ErrorEvent
            ? `Error: ${error.error.message}`
            : `Error Code: ${error.status} - ${error.message}`;
          return throwError(() => new Error(errorMessage));
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  getLoanApplications(): Observable<any> {
    try {
      const headers = this.getHeaders();
      return this.http.get(`${this.apiUrl}/users/get_all_applications/`, { headers })
        .pipe(
          catchError(error => {
            console.error('Loan applications fetch error:', error);
            return throwError(() => error);
          })
        );
    } catch (error) {
      return throwError(() => error);
    }
  }

  getLoanApplication(applicationId: number): Observable<any> {
    try {
      const headers = this.getHeaders();
      return this.http.get(`${this.apiUrl}/users/get_application_by_id/${applicationId}`, { headers })
        .pipe(
          catchError(error => {
            console.error('Loan application fetch error:', error);
            return throwError(() => error);
          })
        );
    } catch (error) {
      return throwError(() => error);
    }
  }

  updateLoanApplicationStatus(applicationId: number, loanStatus: string, disbursedAmount: number, payout_percentage: number): Observable<any> {
    try {
      const headers = this.getHeaders();
      
      // Prepare the body with both loan status and disbursed amount
      const formData = new FormData();

    // Append loan status and disbursed amount to FormData
    formData.append('loan_status', loanStatus);
    formData.append('disbursed_amount', disbursedAmount.toString());
    formData.append('payout_percentage', payout_percentage.toString());
  
      // Make the PUT request with the updated payload
      return this.http.put(
        `${this.apiUrl}/users/update_loan_application/${applicationId}`,
        formData,
        { headers }
      ).pipe(
        catchError(error => {
          console.error('Loan application update error:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }
  

  updateLoanApplication(applicationId: number, applicationData: FormData): Observable<any> {
    try {
      const headers = this.getHeaders();
      return this.http.put(
        `${this.apiUrl}/users/update_loan_application/${applicationId}`,
        applicationData,
        { headers }
      ).pipe(
        catchError(error => {
          console.error('Loan application update error:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  deleteLoanApplication(applicationId: number): Observable<any> { 
    try {
      const headers = this.getHeaders();
      return this.http.delete(`${this.apiUrl}/users/delete_loan_application/${applicationId}`, { headers })
        .pipe(
          catchError(error => {
            console.error('Loan application delete error:', error);
            return throwError(() => error);
          })
        );
    } catch (error) {
      return throwError(() => error);
    }
  }



  















}