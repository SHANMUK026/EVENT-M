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
 constructor(private auth: AuthService) {
  if (typeof window !== 'undefined' && !this.auth.isAuthenticated()) {
    window.location.replace('/login');
  }
}


  logout(): void {
    this.auth.logout();
    window.location.replace('/login');
  }
}
