import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found.ts/not-found';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/layout/app-shell/shell.routes').then(m => m.routes),
  },
  { path: '**', component: NotFound }
];
