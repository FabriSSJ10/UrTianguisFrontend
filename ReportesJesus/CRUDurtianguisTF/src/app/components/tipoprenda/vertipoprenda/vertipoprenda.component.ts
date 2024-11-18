import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tipo_prenda } from '../../../models/Tipoprenda';
import { TipoPrendaService } from '../../../services/tipoprenda.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vertipoprenda',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule,CommonModule, MatCardModule],
  templateUrl: './vertipoprenda.component.html',
  styleUrl: './vertipoprenda.component.css'
})
export class VertipoprendaComponent {
  dataSource: MatTableDataSource<Tipo_prenda> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];
  constructor(private tpS: TipoPrendaService) {}
  ngOnInit(): void {
    this.tpS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tpS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
