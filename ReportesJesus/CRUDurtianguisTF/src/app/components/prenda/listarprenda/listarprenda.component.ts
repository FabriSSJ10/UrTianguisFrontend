import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Prenda } from '../../../models/Prenda';
import { PrendaService } from '../../../services/prenda.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarprenda',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule, MatIconModule, MatCardModule, CommonModule, RouterLink,],
  templateUrl: './listarprenda.component.html',
  styleUrl: './listarprenda.component.css'
})
export class ListarprendaComponent implements OnInit {
  dataSource: MatTableDataSource<Prenda> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13']
  constructor(private pS: PrendaService) {}
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