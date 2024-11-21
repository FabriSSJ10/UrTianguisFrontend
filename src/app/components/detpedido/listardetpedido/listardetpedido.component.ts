import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Detpedido } from '../../../models/Detpedido';
import { DetpedidoService } from '../../../services/detpedido.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listardetpedido',
  standalone: true,
  imports: [MatCardModule, CommonModule,MatTableModule,MatIconModule, MatPaginatorModule, RouterLink],
  templateUrl: './listardetpedido.component.html',
  styleUrl: './listardetpedido.component.css'
})
export class ListardetpedidoComponent implements OnInit{
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
  eliminar(id:number){
    this.dS.delete(id).subscribe((data)=>{
      this.dS.list().subscribe((data)=>{
        this.dS.setList(data);
    })
  })}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
