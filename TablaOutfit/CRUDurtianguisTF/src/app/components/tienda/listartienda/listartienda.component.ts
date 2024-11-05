import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tienda } from '../../../models/Tienda';
import { TiendaService } from '../../../services/tienda.service';

@Component({
  selector: 'app-listartienda',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './listartienda.component.html',
  styleUrl: './listartienda.component.css',
})
export class ListartiendaComponent implements OnInit {
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

  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
