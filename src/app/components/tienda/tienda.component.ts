import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartiendaComponent } from './listartienda/listartienda.component';
import { VertiendaComponent } from './vertienda/vertienda.component';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [RouterOutlet, ListartiendaComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent {
  constructor(public route: ActivatedRoute) {}
}
