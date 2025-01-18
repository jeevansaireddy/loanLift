import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partnerdashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './partnerdashboard.component.html',
  styleUrl: './partnerdashboard.component.scss'
})
export class PartnerdashboardComponent {

  constructor(private router: Router) { }

  onLogout() {
    // Clear any stored data
    localStorage.clear();
    // Navigate to login page
    this.router.navigate(['/partner/login']);
  }

}
