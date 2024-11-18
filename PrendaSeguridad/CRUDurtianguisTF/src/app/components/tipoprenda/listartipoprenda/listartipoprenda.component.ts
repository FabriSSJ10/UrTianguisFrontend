import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Tipo_prenda } from '../../../models/Tipoprenda';
import { TipoPrendaService } from '../../../services/tipoprenda.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listartipoprenda',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatPaginatorModule,RouterLink,CommonModule, MatCardModule],
  templateUrl: './listartipoprenda.component.html',
  styleUrl: './listartipoprenda.component.css',
})
export class ListartipoprendaComponent implements OnInit {
  dataSource: MatTableDataSource<Tipo_prenda> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','accion01','accion02'];
  constructor(private tpS: TipoPrendaService) {}
  ngOnInit(): void {
    this.tpS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tpS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.tpS.delete(id).subscribe((data) => {
      this.tpS.list().subscribe((data) => {
        this.tpS.setList(data);
      });
    });
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
