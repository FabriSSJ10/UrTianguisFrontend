import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpedidoComponent } from './listarpedido/listarpedido.component';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [RouterOutlet, ListarpedidoComponent],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  constructor(public route: ActivatedRoute) {}
}
