import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (typeof window === 'undefined') return router.createUrlTree(['/login']);

  const isLoggedIn = auth.isAuthenticated();
  return isLoggedIn ? true : router.createUrlTree(['/login']);
};
