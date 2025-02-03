import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router';
import { Designs } from '../designs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl:'./details.component.html',
  styles: ``
})
export class DetailsComponent {
  housingService = inject(HousingService);
  route: ActivatedRoute = inject(ActivatedRoute);
  design: Designs | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(){
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingService.getEntity(housingLocationId).subscribe((data) => {
      this.design = data; 
    });
  }
}
