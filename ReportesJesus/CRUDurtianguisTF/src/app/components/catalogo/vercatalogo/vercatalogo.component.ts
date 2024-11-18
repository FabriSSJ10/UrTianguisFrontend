import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatalogoService } from '../../../services/catalogo.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Catalogo } from '../../../models/Catalogo';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vercatalogo',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './vercatalogo.component.html',
  styleUrl: './vercatalogo.component.css'
})
export class VercatalogoComponent{
  dataSource: MatTableDataSource<Catalogo> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4']
  constructor(private cS: CatalogoService) {}
  ngOnInit(): void {
    this.cS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.cS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
