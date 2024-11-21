import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Prenda } from '../../../models/Prenda';
import { PrendaService } from '../../../services/prenda.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verprenda',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './verprenda.component.html',
  styleUrl: './verprenda.component.css'
})
export class VerprendaComponent {
  dataSource: MatTableDataSource<Prenda> = new MatTableDataSource();

  expandedCard: number | null = null; 

  verMas(id: number): void {
    this.expandedCard = id;
  }

  regresar(): void {
    this.expandedCard = null;
  }
  
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
