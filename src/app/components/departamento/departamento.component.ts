import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardepartamentoComponent } from './listardepartamento/listardepartamento.component';

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [RouterOutlet, ListardepartamentoComponent],
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent {
  constructor(public route: ActivatedRoute) {}
}
