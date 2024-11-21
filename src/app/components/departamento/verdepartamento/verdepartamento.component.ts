import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DepartamentoService } from '../../../services/departamento.service';
import { Departamento } from '../../../models/Departamento';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-verdepartamento',
  standalone: true,
  imports: [MatCardModule, CommonModule,MatTableModule,MatIconModule, MatPaginatorModule],
  templateUrl: './verdepartamento.component.html',
  styleUrl: './verdepartamento.component.css'
})
export class VerdepartamentoComponent {
  dataSource: MatTableDataSource<Departamento> = new MatTableDataSource();
  
  constructor(private dS: DepartamentoService) {}
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  expandedCard: number | null = null; 
  verMas(id: number) {
    this.expandedCard = id;
  }

  regresar() {
    this.expandedCard = null;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
