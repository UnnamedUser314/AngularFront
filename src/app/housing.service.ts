import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { Designs } from './designs';
import { Puja } from './puja';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'https://localhost:7777/api/'; 


  puja: Puja | undefined;

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

  constructor(private http: HttpClient) {
  }

  getEntities(): Observable<Designs[]> {
    return this.http.get<Designs[]>(this.apiUrl+"Design");
  }

  getEntity(id: number): Observable<Designs> {
    return this.http.get<Designs>(`${this.apiUrl+"Design"}/${id}`);
  }

  createEntity(entity: Designs): Observable<Designs> {
    return this.http.post<Designs>(this.apiUrl+"Design", entity);
  }

  createPuja(entity: Puja): Observable<Puja> {
    return this.http.post<Puja>(this.apiUrl+"Puja", entity);
  }

  updateEntity(id: number, entity: Designs): Observable<void> {
    return this.http.put<void>(`${this.apiUrl+"Design"}/${id}`, entity);
  }

  deleteEntity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl+"Design"}/${id}`);
  }
}
