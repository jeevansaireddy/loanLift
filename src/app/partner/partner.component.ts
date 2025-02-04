import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.scss'
})
export class PartnerComponent {

  constructor(private router: Router) { }

  onLogout() {
    // Clear any stored data
    localStorage.clear();
    // Navigate to login page
    this.router.navigate(['/partner/login']);
  }

}
