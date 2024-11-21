import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipoocasionComponent } from './listartipoocasion/listartipoocasion.component';

@Component({
  selector: 'app-tipoocasion',
  standalone: true,
  imports: [RouterOutlet,ListartipoocasionComponent],
  templateUrl: './tipoocasion.component.html',
  styleUrl: './tipoocasion.component.css'
})
export class TipoocasionComponent {
  constructor(public route: ActivatedRoute) {}
}
