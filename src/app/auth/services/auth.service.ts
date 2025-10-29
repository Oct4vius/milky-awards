import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { User } from '../../../interfaces/user.interfaces';
import { catchError, map, throwError } from 'rxjs';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayloadType,
  RegisterResponse,
} from '../interfaces/auth.intefaces';
import { Router } from '@angular/router';
import { apiConfig } from '../../../environments/api-config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private baseURL = enviroments.baseURL;

  private _currentUser = signal<User | null>(null);
  public currentUser = computed(() => {return this._currentUser()});

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    localStorage.setItem('token', token);

    return true;
  }

  public get isUserAdmin() {
    return this.currentUser()?.admin || false
  } 

  public login({ email, password }: LoginPayload) {
    return this.http
      .post<LoginResponse>(`${this.baseURL}/auth/login`, {
        email,
        password,
      }, apiConfig)
      .pipe(
        map(({ user, token }) => {
          return this.setAuthentication(user, token);
        }),
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public logout() {
    this._currentUser.set(null);
    localStorage.removeItem('token');

    this.router.navigateByUrl('/auth/login');
  }

  public register(payload: RegisterPayloadType) {
    return this.http.post<RegisterResponse>(
      `${this.baseURL}/auth/register`,
      payload, apiConfig
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
      .get<User>(`${this.baseURL}/auth/check-token`, {
        headers: {
          ...apiConfig.headers,
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
      .post(`${this.baseURL}/auth/check-if-whitelisted`, {
        email,
      }, apiConfig)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }
}
