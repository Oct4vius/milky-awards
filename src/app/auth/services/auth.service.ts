import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { enviroments } from '../../../environment/environments';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    private http = inject(HttpClient);


    public login({email, password}: {email: string, password: string}) {
        return this.http.post(`${enviroments.baseURL}/auth/login`, { email, password})
            .pipe(
                // Handle the response as needed, e.g., store tokens, etc.
            );
    }

}