import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { TipoocasionComponent } from './components/tipoocasion/tipoocasion.component';
import { TipopagoComponent } from './components/tipopago/tipopago.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NotificacionComponent } from './components/notificacion/notificacion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DepartamentoComponent,
    TipopagoComponent,
    TipoocasionComponent,
    NotificacionComponent,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CRUDurtianguisTF';
}
