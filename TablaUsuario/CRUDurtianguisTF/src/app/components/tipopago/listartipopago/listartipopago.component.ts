import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Tipopago } from '../../../models/Tipopago';
import { TipopagoService } from '../../../services/tipopago.service';

@Component({
  selector: 'app-listartipopago',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listartipopago.component.html',
  styleUrl: './listartipopago.component.css',
})
export class ListartipopagoComponent implements OnInit {
  dataSource: MatTableDataSource<Tipopago> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'accion01', 'accion02'];
  constructor(private tS: TipopagoService) {}
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }
}
