import { Routes } from '@angular/router';
import { PetList } from '../../../domains/pets/pages/list/pet-list';
import { PetDetail } from '../../../domains/pets/pages/detail/detail';

export const routes: Routes = [
  {
    path: '',
    component: PetList,
  },
  { path: 'pet-detail/:id', component: PetDetail },
];
