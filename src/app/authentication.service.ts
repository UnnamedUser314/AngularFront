
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiUrl = 'https://localhost:7777/api/users/login';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ result: {token: string} }> {
    return this.http.post<{result:{token: string}  }>(this.apiUrl, credentials).pipe(
      tap(response => {
        console.log('Full Response:', response);  // Log the full response
        if (response && response.result.token) {
          localStorage.setItem(this.tokenKey, response.result.token);
        } else {
          console.error('Token not found in response');
        }
      })
    );
  }


  isAuthenticated(): boolean { 
    const token = localStorage.getItem(this.tokenKey);
    
    console.log('Stored Token:', token);
  
    if (!token) return false;
    
    const expired = this.isTokenExpired(token);
    console.log('Is Token Expired:', expired);
    
    return !expired;
  }
  
  private isTokenExpired(token: string): boolean {
    try {
      console.log('Original Token:', token); 
      
      token = token.startsWith('Bearer ') ? token.substring(7) : token;
      
      console.log('Token After Bearer Removal:', token);

      if (token.split('.').length !== 3) {
        console.error('Invalid token format');
        return true; 
      }
    
      token = token.replace(/-/g, '+').replace(/_/g, '/');  
  
      console.log('Token After Base64url Fix:', token);
  

      const payload = JSON.parse(atob(token.split('.')[1])); 
      const expiry = payload.exp * 1000;
      const now = Date.now();
      
      console.log('Token Expiry:', new Date(expiry).toISOString());
      console.log('Current Time:', new Date(now).toISOString());
      console.log('Token Expired:', now > expiry);
      
      return now > expiry;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; 
    }
  }
  

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  
}
