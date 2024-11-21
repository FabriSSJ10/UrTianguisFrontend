import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Detpedido } from '../../../models/Detpedido';
import { DetpedidoService } from '../../../services/detpedido.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-verdetpedido',
  standalone: true,
  imports: [MatCardModule, CommonModule,MatTableModule, MatIconModule, MatPaginator],
  templateUrl: './verdetpedido.component.html',
  styleUrl: './verdetpedido.component.css'
})
export class VerdetpedidoComponent {
  dataSource: MatTableDataSource<Detpedido> = new MatTableDataSource();

  expandedCard: number | null = null; 

  verMas(id: number): void {
    this.expandedCard = id;
  }

  regresar(): void {
    this.expandedCard = null;
  }
  constructor(private dS: DetpedidoService) {}
  ngOnInit(): void {
    this.dS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.dS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
