import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Tipoocasion } from '../../../models/Tipoocasion';
import { TipoocasionService } from '../../../services/tipoocasion.service';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-listartipoocasion',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterLink, MatPaginatorModule],
  templateUrl: './listartipoocasion.component.html',
  styleUrl: './listartipoocasion.component.css'
})
export class ListartipoocasionComponent implements OnInit {
  dataSource: MatTableDataSource<Tipoocasion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','accion01','accion02'];
  constructor(private sT: TipoocasionService) {}
  ngOnInit(): void {
    this.sT.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sT.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.sT.delete(id).subscribe((data) => {
      this.sT.list().subscribe((data) => {
        this.sT.setList(data);
      });
    });
  }
}
