import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, RouterLink, MatCardModule, CommonModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {
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
