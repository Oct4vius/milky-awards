import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObligatoryCategories } from '../interfaces/vote-category.interfaces';
import { map, catchError, throwError } from 'rxjs';
import { enviroments } from '../../../../../environments/environments';
import { apiConfig } from '../../../../../environments/api-config';

@Injectable({ providedIn: 'root' })
export class ObligatoryService {
  private http = inject(HttpClient);
  private baseURL = enviroments.baseURL;

  public getAll() {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get<ObligatoryCategories[]>(
        `${this.baseURL}/obligatory-categories`,
        {
          headers: {
            ...apiConfig.headers,
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
