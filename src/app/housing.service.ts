
import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { Designs } from './designs';
import { Puja } from './puja';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'https://localhost:7777/api/';
  
  puja: Puja | undefined;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); 
    let headers = new HttpHeaders();
    
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  submitApplication(firstName: string, lastName: string, email: string, amount: number, design: Designs | undefined, housingLocationId: number) {
    this.puja = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      amount: amount
    }

    if (design) {
      this.updateEntity(housingLocationId, design).subscribe({
        next: (response) => {
          console.log('Puja created successfully:', response);
        },
        error: (err) => {
          console.error('Error creating puja:', err);
        }
      });
    }

    if (this.puja) {
      if(design) {
        if(design.estimatedPrice < amount){
          this.createPuja(this.puja).subscribe({
            next: (response) => {
              console.log('Puja created successfully:', response);
            },
            error: (err) => {
              console.error('Error creating puja:', err);
            }
          });
        }
      }
    }
  }


  getEntities(): Observable<Designs[]> {
    return this.http.get<Designs[]>(this.apiUrl + "Design", { headers: this.getAuthHeaders() });
  }


  getEntity(id: number): Observable<Designs> {
    return this.http.get<Designs>(`${this.apiUrl + "Design"}/${id}`, { headers: this.getAuthHeaders() });
  }


  createEntity(entity: Designs): Observable<Designs> {
    return this.http.post<Designs>(this.apiUrl + "Design", entity, { headers: this.getAuthHeaders() });
  }


  createPuja(entity: Puja): Observable<Puja> {
    return this.http.post<Puja>(this.apiUrl + "Puja", entity, { headers: this.getAuthHeaders() });
  }


  updateEntity(id: number, entity: Designs): Observable<void> {
    return this.http.put<void>(`${this.apiUrl + "Design"}/${id}`, entity, { headers: this.getAuthHeaders() });
  }


  deleteEntity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl + "Design"}/${id}`, { headers: this.getAuthHeaders() });
  }
}
