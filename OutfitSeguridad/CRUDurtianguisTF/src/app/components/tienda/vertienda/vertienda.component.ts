import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TiendaService } from '../../../services/tienda.service';
import { Tienda } from '../../../models/Tienda';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vertienda',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatPaginatorModule, CommonModule, MatCardModule],

  templateUrl: './vertienda.component.html',
  styleUrl: './vertienda.component.css'
})
export class VertiendaComponent {
  dataSource: MatTableDataSource<Tienda> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  constructor(private uS: TiendaService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
