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
import { TiendaComponent } from './components/tienda/tienda.component';

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
    UsuarioComponent,
    TiendaComponent,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUDurtianguisTF';
}
