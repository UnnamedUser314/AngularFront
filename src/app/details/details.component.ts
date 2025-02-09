import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Router } from '@angular/router';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Designs } from '../designs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl:'./details.component.html',
  styleUrl: `./details.component.css`
})
export class DetailsComponent {
  housingService = inject(HousingService);
  isAuth: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  authService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);
  design: Designs | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(){
    this.isAuth = this.authService.isAuthenticated();

    if(!this.isAuth){
      this.router.navigate(['/login']); 
      return;
    }

    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingService.getEntity(housingLocationId).subscribe((data) => {
      this.design = data; 
    });
  }
}
