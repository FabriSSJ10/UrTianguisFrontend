import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterLink, CommonModule, MatCardModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  expandedCard: number | null = null; 

  verMas(id: number): void {
    this.expandedCard = id;
  }

  regresar(): void {
    this.expandedCard = null;
  }
  constructor(private mS: RolService) {}
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
