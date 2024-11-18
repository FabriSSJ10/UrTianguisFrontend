import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardetpedidoComponent } from './listardetpedido/listardetpedido.component';

@Component({
  selector: 'app-detpedido',
  standalone: true,
  imports: [RouterOutlet, ListardetpedidoComponent],
  templateUrl: './detpedido.component.html',
  styleUrl: './detpedido.component.css'
})
export class DetpedidoComponent {
  constructor(public route: ActivatedRoute) {}
}
