import { inject, Injectable } from '@angular/core';
import { enviroments } from '../../../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { OptionalCategories } from '../interfaces/vote-category.interfaces';
import { map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionalService {
  private http = inject(HttpClient);

  private baseURL = enviroments.baseURL;

  public getAll() {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get<OptionalCategories[]>(
        `${this.baseURL}/optional-categories`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(
        map((response) => response),
        catchError((err) => throwError(() => new Error(err.error.message)))
      );
  }

  public delete(uuid: string) {
    const token = localStorage.getItem('token') || '';
    return this.http
      .delete(`${this.baseURL}/optional-categories/${uuid}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((response) => response),
        catchError((err) => throwError(() => new Error(err.error.message)))
      );
  }

  public increaseVoteOptionalCatregory(uuid: string) {
    const token = localStorage.getItem('token') || '';
    return this.http
      .patch<OptionalCategories>(
        `${this.baseURL}/optional-categories/increase/${uuid}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(
        map((response) => response),
        catchError((err) => throwError(() => new Error(err.error.message)))
      );
  }

  public DecreaseVoteOptionalCatregory(uuid: string) {
    const token = localStorage.getItem('token') || '';
    return this.http
      .patch<OptionalCategories>(
        `${this.baseURL}/optional-categories/decrease/${uuid}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(
        map((response) => response),
        catchError((err) => throwError(() => new Error(err.error.message)))
      );
  }
}
