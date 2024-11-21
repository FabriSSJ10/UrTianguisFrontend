import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pago } from '../../../models/Pago';
import { PagoService } from '../../../services/pago.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarpago',
  standalone: true,
  imports: [MatTableModule,MatIconModule, MatPaginatorModule,RouterLink,CommonModule, MatCardModule],
  templateUrl: './listarpago.component.html',
  styleUrl: './listarpago.component.css'
})
export class ListarpagoComponent implements OnInit{
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();

  expandedCard: number | null = null;

  verMas(id: number): void {
    this.expandedCard = id; 
  }

  regresar(): void {
    this.expandedCard = null; 
  }

  constructor(private pS: PagoService) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }

  censurarNumeroTarjeta(num: string): string {
    return num.slice(0, -2).replace(/\d/g, '*') + num.slice(-2);
  }

  censurarCodigoValidacion(codigo: string): string {
    return codigo.slice(0, -2).replace(/\d/g, '****');
  }
}
