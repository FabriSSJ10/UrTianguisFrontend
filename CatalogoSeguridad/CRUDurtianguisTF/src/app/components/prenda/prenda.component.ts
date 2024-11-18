import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarprendaComponent } from './listarprenda/listarprenda.component';

@Component({
  selector: 'app-prenda',
  standalone: true,
  imports: [RouterOutlet, ListarprendaComponent],
  templateUrl: './prenda.component.html',
  styleUrl: './prenda.component.css'
})
export class PrendaComponent {
  constructor(public route: ActivatedRoute) {}
}
