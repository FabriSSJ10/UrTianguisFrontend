import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tipo_ocasion } from '../../../models/Tipo_ocasion';
import { TipoocasionService } from '../../../services/tipoocasion.service';

@Component({
  selector: 'app-listartipoocasion',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listartipoocasion.component.html',
  styleUrl: './listartipoocasion.component.css'
})
export class ListartipoocasionComponent implements OnInit {
  dataSource: MatTableDataSource<Tipo_ocasion> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2'];

  constructor(private to: TipoocasionService) {}
  ngOnInit(): void {
    this.to.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
