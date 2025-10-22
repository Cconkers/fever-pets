import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pets',
    pathMatch: 'full'
  },
  {
    path: 'pets',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../../domains/pets/pages/pet-list/pet-list').then(m => m.PetList),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('../../../domains/pets/pages/pet-detail/pet-detail').then(m => m.PetDetailComponent),
      }
    ]
  }
];
