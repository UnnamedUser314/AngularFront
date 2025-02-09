import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";
import { BidWindowComponent } from "./bid-window/bid-window.component";

const routeConfig: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        title: 'Home Page'
    },
    {
        path:'details/:id',
        component:DetailsComponent,
        title:'Details Page'
    },
    {
        path: 'bid/:id',
        component: BidWindowComponent,
        title: 'Bid Page'
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { 
        path: '**', 
        redirectTo: 'home'
    }
];

export default routeConfig