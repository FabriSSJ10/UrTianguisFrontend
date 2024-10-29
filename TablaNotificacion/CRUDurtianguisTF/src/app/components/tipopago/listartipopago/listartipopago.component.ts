import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tipo_pago } from '../../../models/Tipo_pago';
import { TipopagoService } from '../../../services/tipopago.service';

@Component({
  selector: 'app-listartipopago',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listartipopago.component.html',
  styleUrl: './listartipopago.component.css'
})
export class ListartipopagoComponent implements OnInit{
  dataSource: MatTableDataSource<Tipo_pago> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2'];

  constructor(private to: TipopagoService) {}
  ngOnInit(): void {
    this.to.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
