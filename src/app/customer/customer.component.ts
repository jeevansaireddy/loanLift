import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom, // Uses Shadow DOM

})
export class CustomerComponent {
  constructor(private router: Router) { }

  onLogout() {
    // Clear any stored data
    localStorage.clear();
    // Navigate to login page
    this.router.navigate(['/customer/login']);
  }

}
