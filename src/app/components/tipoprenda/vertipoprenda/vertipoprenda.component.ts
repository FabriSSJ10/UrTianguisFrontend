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
  dataSource: Tipo_prenda[] = [];
  paginatedData: Tipo_prenda[] = [];
  pageSize = 5;
  currentPage = 0;
  expandedCard: number | null = null;

  verMas(id: number): void {
    this.expandedCard = id;
  }

  regresar(): void {
    this.expandedCard = null;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tpS: TipoPrendaService) {}

  ngOnInit(): void {
    this.tpS.list().subscribe((data) => {
      this.dataSource = data;
      this.setPaginatedData();
    });

    this.tpS.getList().subscribe((data) => {
      this.dataSource = data;
      this.setPaginatedData();
    });
  }

  eliminar(id: number) {
    this.tpS.delete(id).subscribe(() => {
      this.tpS.list().subscribe((data) => {
        this.dataSource = data;
        this.setPaginatedData();
      });
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.setPaginatedData();
  }

  setPaginatedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.dataSource.slice(startIndex, endIndex);
  }
}
