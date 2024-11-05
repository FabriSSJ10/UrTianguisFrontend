import { Routes } from '@angular/router';
import { PagoComponent } from './components/pago/pago.component';

export const routes: Routes = [
  {
    path: 'pagos',
    component: PagoComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarpagoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditarpagoComponent,
      },
    ],
  },
];
