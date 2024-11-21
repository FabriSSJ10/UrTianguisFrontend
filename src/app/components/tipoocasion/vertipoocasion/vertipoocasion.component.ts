import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tipoocasion } from '../../../models/Tipoocasion';
import { TipoocasionService } from '../../../services/tipoocasion.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vertipoocasion',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatPaginatorModule, CommonModule, MatCardModule],
  templateUrl: './vertipoocasion.component.html',
  styleUrl: './vertipoocasion.component.css'
})
export class VertipoocasionComponent {
  dataSource: MatTableDataSource<Tipoocasion> = new MatTableDataSource();
  expandedCard: number | null = null;

  verMas(id: number): void {
    this.expandedCard = id;
  }

  regresar(): void {
    this.expandedCard = null;
  }
  constructor(private sT: TipoocasionService) {}
  ngOnInit(): void {
    this.sT.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sT.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
