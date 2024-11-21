import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatalogoService } from '../../../services/catalogo.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Catalogo } from '../../../models/Catalogo';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vercatalogo',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatPaginatorModule, MatTableModule, MatIconModule],
  templateUrl: './vercatalogo.component.html',
  styleUrl: './vercatalogo.component.css'
})
export class VercatalogoComponent{
  dataSource: Catalogo[] = [];
  expandedCard: number | null = null; 
  paginatedData: Catalogo[] = [];
  pageSize = 5;
  currentPage = 0;

  constructor(private cS: CatalogoService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = data;
      this.setPaginatedData();
    });

    this.cS.getList().subscribe((data) => {
      this.dataSource = data;
      this.setPaginatedData();
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  verMas(id: number) {
    this.expandedCard = id;
  }

  regresar() {
    this.expandedCard = null;
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
