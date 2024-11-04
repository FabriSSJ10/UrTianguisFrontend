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
import { RolComponent } from './components/rol/rol.component';
import { CrearrolComponent } from './components/rol/crearrol/crearrol.component';

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
    path: 'roles',
    component: RolComponent,
    children: [
      {
        path: 'nuevo',
        component: CrearrolComponent,
      },
      {
        path: 'ediciones/:id',
        component: CrearrolComponent,
      },
    ],
  },
];
