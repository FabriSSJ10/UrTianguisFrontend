import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { TipopagoComponent } from './components/tipopago/tipopago.component';
import { TipoocasionComponent } from './components/tipoocasion/tipoocasion.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TipoPrendaComponent } from './components/tipoprenda/tipoprenda.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PrendaComponent } from './components/prenda/prenda.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { ComentariooutfitComponent } from './components/comentariooutfit/comentariooutfit.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { RolComponent } from './components/rol/rol.component';
import { PagoComponent } from './components/pago/pago.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { DetpedidoComponent } from './components/detpedido/detpedido.component';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DepartamentoComponent,
    NotificacionComponent,
    TipoocasionComponent,
    TipopagoComponent,
    TipoPrendaComponent,
    RolComponent,
    UsuarioComponent,
    PrendaComponent,
    TiendaComponent,
    OutfitComponent,
    ComentariooutfitComponent,
    CatalogoComponent,
    PagoComponent,
    PedidoComponent,
    DetpedidoComponent,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUDurtianguisTF';
  rol: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.rol = this.loginService.showRole();
    if (this.rol) {
        console.log('Rol del usuario:', this.rol);
    } else {
        console.warn('sessionStorage no está disponible o el rol no existe.');
    }
    return this.loginService.verificar();
  }
  esAdministrador() {
    return this.rol === 'ADMINISTRADOR';
  }

  esVendedor() {
    return this.rol === 'VENDEDOR';
  }

  esCliente() {
    return this.rol === 'CLIENTE';
  }

  esSupervisor() {
    return this.rol === 'SUPERVISOR';
  }

  esVendedorOAdministrador() {
    return this.rol === 'VENDEDOR' || this.rol === 'ADMINISTRADOR';
  }

  esClienteOAdministrador() {
    return this.rol === 'CLIENTE' || this.rol === 'ADMINISTRADOR';
  }

  esSupervisorOAdministrador() {
    return this.rol === 'SUPERVISOR' || this.rol === 'ADMINISTRADOR';
  }
}
