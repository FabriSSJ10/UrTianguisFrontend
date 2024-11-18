import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vernotificacion',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule,MatCardModule, CommonModule],
  templateUrl: './vernotificacion.component.html',
  styleUrl: './vernotificacion.component.css'
})
export class VernotificacionComponent {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2']
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
