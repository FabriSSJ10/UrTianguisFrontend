import { Routes } from '@angular/router';
import { PrendaComponent } from './components/prenda/prenda.component';
import { CreareditarprendaComponent } from './components/prenda/creareditarprenda/creareditarprenda.component';

export const routes: Routes = [
  {
    path: 'prendas',
    component: PrendaComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarprendaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditarprendaComponent,
      },
    ],
  },
];
