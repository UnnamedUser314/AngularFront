import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { ActivatedRoute } from '@angular/router';
import { Designs } from '../designs';

@Component({
  selector: 'app-bid-window',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bid-window.component.html',
  styleUrl: './bid-window.component.css' 
})
export class BidWindowComponent {
  housingService = inject(HousingService);  
  route: ActivatedRoute = inject(ActivatedRoute);
  design: Designs | undefined;
  housingLocationId: number;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    amount: new FormControl()
  });

  constructor(){
    this.housingLocationId = Number(this.route.snapshot.params["id"]);
    
    this.housingService.getEntity(this.housingLocationId).subscribe((data) => {
      this.design = data; 
    });
  }

  submitApplication(){
    if (this.design && this.applyForm.value.amount > this.design.estimatedPrice) {
      this.design.estimatedPrice = this.applyForm.value.amount; // Safe assignment
    }
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.amount ?? 0,
      this.design ?? undefined, 
      this.housingLocationId ?? 0
    );
  }
}
