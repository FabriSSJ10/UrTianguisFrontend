import { Routes } from '@angular/router';
import { TipopagoComponent } from './components/tipopago/tipopago.component';
import { CreareditartipopagoComponent } from './components/tipopago/creareditartipopago/creareditartipopago.component';

export const routes: Routes = [
  {
    path: 'tipopagos',
    component: TipopagoComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditartipopagoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditartipopagoComponent,
      },
    ],
  },
];
