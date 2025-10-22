import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page'),
  },
  {
    path: 'trending',
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page'),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page'),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },

];
