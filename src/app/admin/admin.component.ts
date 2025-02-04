import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  constructor(private router: Router) { }
    onLogout() {
      // Clear any stored data
      localStorage.clear();
      // Navigate to login page
      this.router.navigate(['/admin/login']);
    }

}
