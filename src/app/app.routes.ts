import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { CustomerComponent } from './pages/Customer/customer.component';
import { HomeComponent } from './pages/home/home.component';
import { WelComeComponent } from './pages/wel-come/wel-come.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'pages',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        component: WelComeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
    ],
  },
];
