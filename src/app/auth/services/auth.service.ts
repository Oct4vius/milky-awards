import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { enviroments } from '../../../environment/environments';
import { LoginResponse, User } from '../../../interfaces/user.interfaces';
import { catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  public currentUser = computed(() => this._currentUser());

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    localStorage.setItem('token', token);

    return true;
  }

  public login({ email, password }: { email: string; password: string }) {
    return this.http
      .post<LoginResponse>(`${enviroments.baseURL}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map(({ user, token }) => {
          return this.setAuthentication(user, token);
        }),
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    return this.http
      .get(`${enviroments.baseURL}/auth/check-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((err) => {
          localStorage.removeItem('token');
          return throwError(() => err.error.message);
        })
      );
  }

  public checkIfWhitelisted(email: string) {
    return this.http
      .post(
        `${enviroments.baseURL}/auth/check-if-whitelisted`,
        {
          email,
        }
      )
      .pipe(
        catchError((err) => throwError(() => err.error.message)),
      );
  }
}
