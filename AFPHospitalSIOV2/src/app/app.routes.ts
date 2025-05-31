import { HomepageComponent } from './feature/homepage/homepage.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'lista-pz',
    canActivate:[AuthGuard],
    loadComponent: () => import('./feature/lista-pz/lista-pz.component')
      .then(m => m.ListaPzComponent),
    pathMatch: 'full'
  },
  {
    path: 'accetta-pz',
    canActivate:[AuthGuard],
    loadComponent: () => import('./feature/accetta-pz/accetta-pz.component')
      .then(m => m.AccettaPzComponent),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./feature/login/login.component')
      .then(m => m.LoginComponent),
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate:[AuthGuard],
    loadComponent: () => import('./feature/homepage/homepage.component')
      .then(m => m.HomepageComponent),
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
