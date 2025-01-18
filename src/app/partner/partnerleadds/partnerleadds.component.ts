import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-partnerleadds',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './partnerleadds.component.html',
  styleUrl: './partnerleadds.component.scss'
})
export class PartnerleaddsComponent {

  constructor(private router: Router) {
  }
  

  onLogout() {
    // Clear any stored data
    localStorage.clear();
    // Navigate to login page
    this.router.navigate(['/partner/login']);
  }

}
