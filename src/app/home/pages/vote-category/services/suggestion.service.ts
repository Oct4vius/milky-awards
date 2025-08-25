import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from '../../../../../environment/environments';
import { CreateSuggestionPayload, CreateSuggestionResponse } from '../interfaces/vote-category.interfaces';
import { catchError, map, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SuggestionService {
    private http = inject(HttpClient);
    private baseUrl = enviroments.baseURL;

    public createSuggestion (payload: CreateSuggestionPayload) {
        const token = localStorage.getItem('token') || '';
        return this.http.post<CreateSuggestionResponse>(
            `${this.baseUrl}/suggestion-categories`,
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

    public getAllSuggestions() {
        const token = localStorage.getItem('token') || '';
        return this.http.get<CreateSuggestionResponse[]>(
            `${this.baseUrl}/suggestion-categories`,
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