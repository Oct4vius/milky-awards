import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { enviroments } from '../../../environment/environments';
import { User } from '../../../interfaces/user.interfaces';
import { catchError, map, throwError } from 'rxjs';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayloadType,
  RegisterResponse,
} from '../interfaces/auth.intefaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  public currentUser = computed(() => {return this._currentUser()});

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    localStorage.setItem('token', token);

    return true;
  }

  public login({ email, password }: LoginPayload) {
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

  public register(payload: RegisterPayloadType) {
    return this.http.post<RegisterResponse>(
      `${enviroments.baseURL}/auth/register`,
      payload
    ).pipe(
      map(({ newUser, token }) => {
        return this.setAuthentication(newUser, token);
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  public checkToken() {
    const token = localStorage.getItem('token');

    return this.http
      .get<User>(`${enviroments.baseURL}/auth/check-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((user) => {
          this._currentUser.set(user);
        }),
        catchError((err) => {
          localStorage.removeItem('token');
          return throwError(() => err.error.message);
        })
      );
  }

  public checkIfWhitelisted(email: string) {
    return this.http
      .post(`${enviroments.baseURL}/auth/check-if-whitelisted`, {
        email,
      })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }
}
