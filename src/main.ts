import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import routeConfig from './app/routes';
import { AppComponent } from './app/app.component';
import { AuthenticationService } from './app/authentication.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(),
    AuthenticationService
  ]
}).catch(err => console.error(err));