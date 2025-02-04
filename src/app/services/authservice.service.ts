import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = 'http://127.0.0.1:8000/users';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.currentUserSubject = new BehaviorSubject<any>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { email, password, role})
      .pipe(
        map(response => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/`, userData)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || `Error Code: ${error.status}`;
    }
    return throwError(() => errorMessage);
  }
}