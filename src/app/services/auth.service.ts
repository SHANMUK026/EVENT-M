import { Injectable } from '@angular/core';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'users';
  private tokenKey = 'token';

  constructor() {
    if (typeof window !== 'undefined') {
      // Clear token on reload
      window.addEventListener('load', () => {
        localStorage.removeItem(this.tokenKey);
      });
    }
  }

  private get users(): User[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private set users(value: User[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(value));
    }
  }

login(email: string, password: string): boolean {
  const user = this.users.find(u => u.email === email && u.password === password);
  if (user && typeof window !== 'undefined') {
    localStorage.setItem('token', 'fake-jwt-token');
    localStorage.setItem('currentUserEmail', user.email);
    return true;
  }
  return false;
}


  signup(username: string, email: string, password: string): boolean {
    const exists = this.users.some(u => u.email === email);
    if (exists) return false;
    this.users = [...this.users, { username, email, password }];
    return true;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(this.tokenKey) === 'valid';
  }
}
