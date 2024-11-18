import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipopagoService } from '../../../services/tipopago.service';
import { Tipopago } from '../../../models/Tipopago';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vertipopago',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatPaginatorModule,CommonModule, MatCardModule],
  templateUrl: './vertipopago.component.html',
  styleUrl: './vertipopago.component.css'
})
export class VertipopagoComponent {
  dataSource: MatTableDataSource<Tipopago> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];
  constructor(private tS: TipopagoService) {}
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
