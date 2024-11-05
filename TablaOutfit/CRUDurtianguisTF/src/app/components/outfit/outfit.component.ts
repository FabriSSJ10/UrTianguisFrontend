import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuarioComponent } from '../usuario/listarusuario/listarusuario.component';
import { ListaroutfitComponent } from "./listaroutfit/listaroutfit.component";

@Component({
  selector: 'app-outfit',
  standalone: true,
  imports: [RouterOutlet, ListarusuarioComponent, ListaroutfitComponent],
  templateUrl: './outfit.component.html',
  styleUrl: './outfit.component.css'
})
export class OutfitComponent {
  constructor(public route: ActivatedRoute) {}
}
