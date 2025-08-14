import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard activated');

  // return authService.checkToken().pipe(
  //   map(() => {
  //     return true;
  //   }),
  //   catchError((err) => {
  //     console.error(err);
  //     localStorage.removeItem('token');
  //     router.navigateByUrl('/auth/login');
  //     return of(false);
  //   })
  // );

  return true
};
