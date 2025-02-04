import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {

  private BASE_URL = 'http://127.0.0.1:8000/';

 constructor(private http: HttpClient) {}
 
   private getHeaders(): HttpHeaders {
     const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
     const bearerToken = currentUser?.access_token;
 
     if (!bearerToken) {
       throw new Error('Authentication token not found');
     }
 
     return new HttpHeaders({
       'Accept': 'application/json',
       'Authorization': `Bearer ${bearerToken}`
     });
   }


   getMyAccountDetails(): Observable<any> {
    try {
      const headers = this.getHeaders();
      return this.http.get(`${this.BASE_URL}/users/get_corporate_project_detail/`, { headers })
        .pipe(
          catchError(error => {
            console.error('Dashboard data fetch error:', error);
            return throwError(() => error);
          })
        );
    } catch (error) {
      return throwError(() => error);
    }
  }

    postMyAccountDetails(leadData: any): Observable<any> {
      try {
        const headers = this.getHeaders();
        return this.http.post(`${this.BASE_URL}/users/add_corporate_project/`, leadData.value, { headers })
          .pipe(
            catchError(error => {
              return throwError(() => error);
            })
          );
      } catch (error) {
        return throwError(() => error);
      }

  }

  updateMyAccountDetails(leadData: any, id: any): Observable<any> {
    try {
      const headers = this.getHeaders();
      // Assuming you have an ID field in your form or data
      const url = `${this.BASE_URL}/users/edit_corporate_project/${id}`;
      
      return this.http.put(url, leadData.value, { headers })
        .pipe(
          catchError(error => {
            return throwError(() => error);
          })
        );
    } catch (error) {
      return throwError(() => error);
    }
  }










}
