import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: []
})
export class DashboardComponent {
  userEmail: string | null = '';

  constructor(private auth: AuthService) {
    if (typeof window !== 'undefined' && !this.auth.isAuthenticated()) {
      window.location.replace('/login');
    }
    this.userEmail = localStorage.getItem('currentUserEmail');
  }

  logout(): void {
    this.auth.logout();
    window.location.replace('/login');
  }
}
