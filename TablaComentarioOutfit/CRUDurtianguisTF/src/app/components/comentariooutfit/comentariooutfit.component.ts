import { Component } from '@angular/core';
import { ListarcomentariooutfitComponent } from './listarcomentariooutfit/listarcomentariooutfit.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-comentariooutfit',
  standalone: true,
  imports: [RouterOutlet, ListarcomentariooutfitComponent],
  templateUrl: './comentariooutfit.component.html',
  styleUrl: './comentariooutfit.component.css'
})
export class ComentariooutfitComponent {
  constructor(public route: ActivatedRoute) {}
}
