import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface PostOffice {
  Division: string;
  State: string;
  District: string;
}

interface PincodeResponse {
  Status: string;
  PostOffice: PostOffice[];
}

@Injectable({
  providedIn: 'root'
})
export class PincodeService {

  private API_URL = 'https://api.allorigins.win/get?url=' + encodeURIComponent('http://www.postalpincode.in/api/pincode');

  constructor(private http: HttpClient) {}

  getCityAndStateByPincode(pincode: string): Observable<PincodeResponse> {
    const url = `${this.API_URL}/${pincode}`;
    return this.http.get<any>(url).pipe(
      map((response) => JSON.parse(response.contents) as PincodeResponse)
    );
  }
}
