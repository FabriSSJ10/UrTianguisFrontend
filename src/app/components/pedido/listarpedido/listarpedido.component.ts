import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pedido } from '../../../models/Pedido';
import { PedidoService } from '../../../services/pedido.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarpedido',
  standalone: true,
  imports: [MatTableModule,MatIconModule, MatPaginatorModule, RouterLink,CommonModule, MatCardModule],
  templateUrl: './listarpedido.component.html',
  styleUrl: './listarpedido.component.css'
})
export class ListarpedidoComponent implements OnInit{
  dataSource: MatTableDataSource<Pedido> = new MatTableDataSource();

  expandedCard: number | null = null;

  verMas(id: number): void {
    this.expandedCard = id; 
  }

  regresar(): void {
    this.expandedCard = null; 
  }

  constructor(private pS: PedidoService) {}
  ngOnInit(): void {
    this.pS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.pS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.pS.delete(id).subscribe((data)=>{
      this.pS.list().subscribe((data)=>{
        this.pS.setList(data);
    })
  })}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
