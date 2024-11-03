import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipoprendaComponent } from './listartipoprenda/listartipoprenda.component';

@Component({
  selector: 'app-tipo_prenda',
  standalone: true,
  imports: [RouterOutlet, ListartipoprendaComponent],
  templateUrl: './tipo_prenda.component.html',
  styleUrls: ['./tipo_prenda.component.css']
})
export class TipoPrendaComponent {
  constructor(public route: ActivatedRoute) {}
}
