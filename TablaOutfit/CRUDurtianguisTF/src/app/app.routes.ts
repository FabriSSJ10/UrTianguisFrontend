import { Routes } from '@angular/router';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { CreareditarnotificacionComponent } from './components/notificacion/creareditarnotificacion/creareditarnotificacion.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { CreareditardepartamentoComponent } from './components/departamento/creareditardepartamento/creareditardepartamento.component';
import { TipoocasionComponent } from './components/tipoocasion/tipoocasion.component';
import { CreareditartipoocasionComponent } from './components/tipoocasion/creareditartipoocasion/creareditartipoocasion.component';
import { TipopagoComponent } from './components/tipopago/tipopago.component';
import { CreareditartipopagoComponent } from './components/tipopago/creareditartipopago/creareditartipopago.component';
import { CreareditartipoprendaComponent } from './components/tipoprenda/creareditartipoprenda/creareditartipoprenda.component';
import { TipoPrendaComponent } from './components/tipoprenda/tipoprenda.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CrearusuarioComponent } from './components/usuario/crearusuario/crearusuario.component';
import { PrendaComponent } from './components/prenda/prenda.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CreartiendaComponent } from './components/tienda/creartienda/creartienda.component';
import { CrearprendaComponent } from './components/prenda/crearprenda/crearprenda.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { CrearoutfitComponent } from './components/outfit/crearoutfit/crearoutfit.component';

export const routes: Routes = [
  {
    path: 'departamentos',
    component: DepartamentoComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditardepartamentoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditardepartamentoComponent,
      },
    ],
  },
  {
    path: 'notificaciones',
    component: NotificacionComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarnotificacionComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditarnotificacionComponent,
      },
    ],
  },
  {
    path: 'tipos_ocasion',
    component: TipoocasionComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditartipoocasionComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditartipoocasionComponent,
      },
    ],
  },
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
  {
    path: 'tipos_prenda',
    component: TipoPrendaComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditartipoprendaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditartipoprendaComponent,
      },
    ],
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: CrearusuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: CrearusuarioComponent,
      },
    ],
  },
  {
    path: 'prendas',
    component: PrendaComponent,
    children: [
      {
        path: 'nuevo',
        component: CrearprendaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CrearprendaComponent,
      },
    ],
  },
  {
    path: 'tiendas',
    component: TiendaComponent,
    children: [
      {
        path: 'nuevo',
        component: CreartiendaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreartiendaComponent,
      },
    ],
  },
  {
    path: 'outfits',
    component: OutfitComponent,
    children: [
      {
        path: 'nuevo',
        component: CrearoutfitComponent,
      },
      {
        path: 'ediciones/:id',
        component: CrearoutfitComponent,
      },
    ],
  },
];
