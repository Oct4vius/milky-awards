import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from '../../../../../environment/environments';
import { CreateSuggestionPayload, SuggestionCategories } from '../interfaces/vote-category.interfaces';
import { catchError, map, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SuggestionService {
    private http = inject(HttpClient);
    private baseURL = enviroments.baseURL;

    public create (payload: CreateSuggestionPayload) {
        const token = localStorage.getItem('token') || '';
        return this.http.post<SuggestionCategories>(
            `${this.baseURL}/suggestion-categories`,
            payload,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        ).pipe(
            map((response) => response),
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }

    public getAll() {
        const token = localStorage.getItem('token') || '';
        return this.http.get<SuggestionCategories[]>(
            `${this.baseURL}/suggestion-categories`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        ).pipe(
            map((response) => response),
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }

    public delete(uuid: string) {
        const token = localStorage.getItem('token') || '';
        return this.http.delete(
            `${this.baseURL}/suggestion-categories/${uuid}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        ).pipe(
            map((response) => response),
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }

    public approve({uuid, title}: {uuid: string, title: string}) {
        const token = localStorage.getItem('token') || '';
        return this.http.post(
            `${this.baseURL}/suggestion-categories/approve/${uuid}`,
            {
                title
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        ).pipe(
            map((response) => response),
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }
    
}