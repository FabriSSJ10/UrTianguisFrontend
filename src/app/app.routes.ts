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
import { ComentariooutfitComponent } from './components/comentariooutfit/comentariooutfit.component';
import { CrearcomentariooutfitComponent } from './components/comentariooutfit/crearcomentariooutfit/crearcomentariooutfit.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { CrearcatalogoComponent } from './components/catalogo/crearcatalogo/crearcatalogo.component';
import { RolComponent } from './components/rol/rol.component';
import { CrearrolComponent } from './components/rol/crearrol/crearrol.component';
import { DetpedidoComponent } from './components/detpedido/detpedido.component';
import { CreareditardetpedidoComponent } from './components/detpedido/creareditardetpedido/creareditardetpedido.component';
import { PagoComponent } from './components/pago/pago.component';
import { CreareditarpagoComponent } from './components/pago/creareditarpago/creareditarpago.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { CreareditarpedidoComponent } from './components/pedido/creareditarpedido/creareditarpedido.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportecantidadpagossegunmetodopagoComponent } from './components/reportes/reportecantidadpagossegunmetodopago/reportecantidadpagossegunmetodopago.component';
import { ReportecantidadpagossegunmetodopagopormesComponent } from './components/reportes/reportecantidadpagossegunmetodopagopormes/reportecantidadpagossegunmetodopagopormes.component';
import { ReportecantidadpedidossegundepartamentoComponent } from './components/reportes/reportecantidadpedidossegundepartamento/reportecantidadpedidossegundepartamento.component';
import { ReportecantidadpedidossegunmesComponent } from './components/reportes/reportecantidadpedidossegunmes/reportecantidadpedidossegunmes.component';
import { ReportemontototalpagosegundepartamentoComponent } from './components/reportes/reportemontototalpagosegundepartamento/reportemontototalpagosegundepartamento.component';
import { ReportemontototalpagosegunsexoComponent } from './components/reportes/reportemontototalpagosegunsexo/reportemontototalpagosegunsexo.component';
import { ReportecantusuariosxdepartamentoComponent } from './components/reportes/reportecantusuariosxdepartamento/reportecantusuariosxdepartamento.component';
import { ReportecantoutfitxprendaComponent } from './components/reportes/reportecantoutfitxprenda/reportecantoutfitxprenda.component';
import { ReportemontototalxtipoprendaComponent } from './components/reportes/reportemontototalxtipoprenda/reportemontototalxtipoprenda.component';
import { HomeComponent } from './components/home/home.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { LoginComponent } from './components/login/login.component';
import { VercatalogoComponent } from './components/catalogo/vercatalogo/vercatalogo.component';
import { VerdepartamentoComponent } from './components/departamento/verdepartamento/verdepartamento.component';
import { VernotificacionComponent } from './components/notificacion/vernotificacion/vernotificacion.component';
import { VertipoocasionComponent } from './components/tipoocasion/vertipoocasion/vertipoocasion.component';
import { VertipopagoComponent } from './components/tipopago/vertipopago/vertipopago.component';
import { VertipoprendaComponent } from './components/tipoprenda/vertipoprenda/vertipoprenda.component';
import { VerusuarioComponent } from './components/usuario/verusuario/verusuario.component';
import { VerprendaComponent } from './components/prenda/verprenda/verprenda.component';
import { VertiendaComponent } from './components/tienda/vertienda/vertienda.component';
import { VeroutfitComponent } from './components/outfit/veroutfit/veroutfit.component';
import { VerrolComponent } from './components/rol/verrol/verrol.component';
import { VerdetpedidoComponent } from './components/detpedido/verdetpedido/verdetpedido.component';
import { VerpagoComponent } from './components/pago/verpago/verpago.component';
import { VerpedidoComponent } from './components/pedido/verpedido/verpedido.component';
import { VercomentariooutfitComponent } from './components/comentariooutfit/vercomentariooutfit/vercomentariooutfit.component';
import { ReportecantprendaxtiendaComponent } from './components/reportes/reportecantprendaxtienda/reportecantprendaxtienda.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'departamentos',
    component: DepartamentoComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditardepartamentoComponent,
      },
      {
        path: 'ver',
        component: VerdepartamentoComponent,
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
        path: 'ver',
        component: VernotificacionComponent,
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
        path: 'ver',
        component: VertipoocasionComponent,
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
        path: 'ver',
        component: VertipopagoComponent,
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
        path: 'ver',
        component: VertipoprendaComponent,
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
        path: 'ver',
        component: VerusuarioComponent,
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
        path: 'ver',
        component: VerprendaComponent,
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
        path: 'ver',
        component: VertiendaComponent,
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
        path: 'ver',
        component: VeroutfitComponent,
      },
      {
        path: 'ediciones/:id',
        component: CrearoutfitComponent,
      },
    ],
  },
  {
    path: 'comentarios_outfit',
    component: ComentariooutfitComponent,
    children: [
      {
        path: 'nuevo',
        component: CrearcomentariooutfitComponent,
      },
      {
        path: 'ver',
        component: VercomentariooutfitComponent,
      },
      {
        path: 'ediciones/:id',
        component: CrearcomentariooutfitComponent,
      },
    ],
  },
  {
    path: 'catalogos',
    component: CatalogoComponent,
    children: [
      {
        path: 'nuevo',
        component: CrearcatalogoComponent,
      },
      {
        path: 'ver',
        component: VercatalogoComponent,
      },
      {
        path: 'ver',
        component: VercatalogoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CrearcatalogoComponent,
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
        path: 'ver',
        component: VerrolComponent,
      },
      {
        path: 'ediciones/:id',
        component: CrearrolComponent,
      },
    ],
  },
  {
    path: 'det_pedido',
    component: DetpedidoComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditardetpedidoComponent,
      },
      {
        path: 'ver',
        component: VerdetpedidoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditardetpedidoComponent,
      },
    ],
  },
  {
    path: 'pagos',
    component: PagoComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarpagoComponent,
      },
      {
        path: 'ver',
        component: VerpagoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditarpagoComponent,
      },
    ],
  },
  {
    path: 'pedidos',
    component: PedidoComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarpedidoComponent,
      },
      {
        path: 'ver',
        component: VerpedidoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditarpedidoComponent,
      },
    ],
  },

  {
    path:'reportes', component:ReportesComponent,
    children:[
      {
        path:'cantidadpagossegunmetodopago',component:ReportecantidadpagossegunmetodopagoComponent,
      },
      {
        path:'cantidadpagossegunmetodopagopormes',component:ReportecantidadpagossegunmetodopagopormesComponent,
      },
      {
        path:'cantidadpedidossegundepartamento',component:ReportecantidadpedidossegundepartamentoComponent,
      },
      {
        path:'cantidadpedidossegunmes',component:ReportecantidadpedidossegunmesComponent,
      },
      {
        path:'cantidadprendasxtienda',component:ReportecantprendaxtiendaComponent,
      },
      {
        path:'montototalpagosegundepartamento',component:ReportemontototalpagosegundepartamentoComponent,
      },
      {
        path:'montototalpagosegunsexo',component:ReportemontototalpagosegunsexoComponent,
      },
      {
        path:'cantidadesusuarioxdepartamento',component:ReportecantusuariosxdepartamentoComponent
      },
      {
        path:'cantidadoutfitxprenda',component:ReportecantoutfitxprendaComponent
      },
      {
        path:'recuadadoxprenda',component:ReportemontototalxtipoprendaComponent
      },
    ],
  },
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [seguridadGuard], // solo construcciones, se debe agregar a cada uno
  },
];
