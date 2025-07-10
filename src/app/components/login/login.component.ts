import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginEmail = '';
  loginPassword = '';
  signupUsername = '';
  signupEmail = '';
  signupPassword = '';
  isSignup = false;

  constructor(private auth: AuthService, private router: Router, private zone: NgZone) {}

  onLogin(): void {
    const success = this.auth.login(this.loginEmail, this.loginPassword);
    if (success) {
      this.zone.run(() => this.router.navigate(['/dashboard']));
    } else {
      alert('Invalid credentials');
    }
  }

  onSignup(): void {
    const success = this.auth.signup(this.signupUsername, this.signupEmail, this.signupPassword);
    if (success) {
      alert('Signup successful. You can now login.');
    } else {
      alert('User already exists');
    }
  }
}
