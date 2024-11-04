import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Comentariooutfit } from '../../../models/Comentariooutfit';
import { ComentariooutfitService } from '../../../services/comentariooutfit.service';

@Component({
  selector: 'app-listarcomentariooutfit',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './listarcomentariooutfit.component.html',
  styleUrl: './listarcomentariooutfit.component.css'
})
export class ListarcomentariooutfitComponent implements OnInit{
  dataSource: MatTableDataSource<Comentariooutfit> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  constructor(private coS: ComentariooutfitService) {}

  ngOnInit(): void {
    this.coS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.coS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.coS.delete(id).subscribe((data) => {
      this.coS.list().subscribe((data) => {
        this.coS.setList(data);
      });
    });
  }
}
