import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcatalogoComponent } from './listarcatalogo/listarcatalogo.component';
import { VercatalogoComponent } from './vercatalogo/vercatalogo.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterOutlet, ListarcatalogoComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  constructor(public route: ActivatedRoute) {}
}
