import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from 'express';

@Component({
  selector: 'app-verusuario',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatPaginatorModule,CommonModule, MatCardModule],
  templateUrl: './verusuario.component.html',
  styleUrl: './verusuario.component.css'
})
export class VerusuarioComponent {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  paginatedData: Usuario[] = [];
  expandedCard: number | null = null; 
  pageSize: number = 5;

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.paginatedData = data.slice(0, this.pageSize);
    });
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.dataSource.data = data;
        this.paginatedData = data.slice(0, this.pageSize);
      });
    });
  }

  verMas(id: number) {
    this.expandedCard = id;
  }

  regresar() {
    this.expandedCard = null;
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.dataSource.data.slice(startIndex, endIndex);
  }
}
