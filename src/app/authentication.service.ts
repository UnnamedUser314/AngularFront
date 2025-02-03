import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiUrl = 'https://localhost:7777/api/users/login'; 
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token); 
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey); 
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
