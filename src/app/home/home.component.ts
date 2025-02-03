import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { Designs } from '../designs';
import { HousingService } from '../housing.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  designList: Designs[] = [];
  housingService: HousingService = inject(HousingService);

  constructor(){
    this.housingService.getEntities().subscribe((data) => {
      this.designList = data; 
    });
  }
}
