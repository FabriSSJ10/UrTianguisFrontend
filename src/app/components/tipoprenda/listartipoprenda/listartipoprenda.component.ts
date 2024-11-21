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
