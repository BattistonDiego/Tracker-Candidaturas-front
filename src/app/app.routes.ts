import { Routes } from '@angular/router';
import { QuadroComponent } from './features/quadro-component/quadro-component';
import { EstatisticasComponent } from './features/estatisticas-component/estatisticas-component';

export const routes: Routes = [
  {
    path: 'quadro',
    component: QuadroComponent,
  },
  {
    path: 'estatisticas',
    component: EstatisticasComponent,
  },
];
