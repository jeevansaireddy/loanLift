import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardserviceService {
  // private BASE_URL = 'http://127.0.0.1:8000';

  private BASE_URL = 'https://www.loanlift.co.in';

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

  fetchdashboarddata(): Observable<any> {
    try {
      const headers = this.getHeaders();
      return this.http.get(`${this.BASE_URL}/users/get_dashboard_data/`, { headers })
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

}