import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NotificacionService } from '../../../services/notificacion.service';
import { Notificacion } from '../../../models/Notificacion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarnotificacion',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule,MatCardModule, CommonModule],
  templateUrl: './listarnotificacion.component.html',
  styleUrl: './listarnotificacion.component.css'
})
export class ListarnotificacionComponent implements OnInit{
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','accion01', 'accion02']
  constructor(private nS: NotificacionService) {}
  ngOnInit(): void {
    this.nS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.nS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.nS.delete(id).subscribe((data)=>{
      this.nS.list().subscribe((data)=>{
        this.nS.setList(data);
    })
  })}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
