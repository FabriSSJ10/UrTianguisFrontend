import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pedido } from '../../../models/Pedido';
import { PedidoService } from '../../../services/pedido.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verpedido',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatPaginatorModule, CommonModule, MatCardModule],
  templateUrl: './verpedido.component.html',
  styleUrl: './verpedido.component.css'
})
export class VerpedidoComponent {
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
