import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipoprendaComponent } from './listartipoprenda/listartipoprenda.component';

@Component({
  selector: 'app-tipo_prenda',
  standalone: true,
  imports: [RouterOutlet, ListartipoprendaComponent],
  templateUrl: './tipoprenda.component.html',
  styleUrls: ['./tipoprenda.component.css']
})
export class TipoPrendaComponent {
  constructor(public route: ActivatedRoute) {}
}
