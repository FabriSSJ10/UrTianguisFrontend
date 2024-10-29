import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipopagoComponent } from './listartipopago/listartipopago.component';

@Component({
  selector: 'app-tipopago',
  standalone: true,
  imports: [RouterOutlet, ListartipopagoComponent],
  templateUrl: './tipopago.component.html',
  styleUrl: './tipopago.component.css'
})
export class TipopagoComponent {
  constructor(public route: ActivatedRoute) {}
}
