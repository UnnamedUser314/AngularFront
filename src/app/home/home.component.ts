import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { Designs } from '../designs';
import { AuthenticationService } from '../authentication.service';
import { HousingService } from '../housing.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  designList: Designs[] = [];
  isAuth: boolean = false;
  router: Router = inject(Router);
  authService: AuthenticationService = inject(AuthenticationService);
  housingService: HousingService = inject(HousingService);

  constructor(){
    this.isAuth = this.authService.isAuthenticated();

    if(!this.isAuth){
      this.router.navigate(['/login']); 
      return;
    }

    this.housingService.getEntities().subscribe((data) => {
      this.designList = data; 
    });
  }
}
