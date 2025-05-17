import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'lista-pz',
    loadComponent: () => import('./feature/lista-pz/lista-pz.component')
      .then(m => m.ListaPzComponent),
    pathMatch: 'full'
  },
  {
    path: 'accetta-pz',
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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'lista-pz',
    pathMatch: 'full'
  }
];
