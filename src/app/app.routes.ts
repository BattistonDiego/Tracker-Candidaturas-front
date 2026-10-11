import { Routes } from '@angular/router';
import { Quadro } from './features/quadro/quadro';
import { Estatisticas } from './features/estatisticas/estatisticas';

export const routes: Routes = [
  { path: '', redirectTo: 'quadro', pathMatch: 'full' },
  {
    path: 'quadro',
    component: Quadro,
  },
  {
    path: 'estatisticas',
    component: Estatisticas,
  },
];
