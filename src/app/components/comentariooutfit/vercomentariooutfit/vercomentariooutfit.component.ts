import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ComentariooutfitService } from '../../../services/comentariooutfit.service';
import { Comentariooutfit } from '../../../models/Comentariooutfit';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vercomentariooutfit',
  standalone: true,
  imports: [MatCardModule, CommonModule,MatPaginatorModule,MatTableModule,MatIconModule],
  templateUrl: './vercomentariooutfit.component.html',
  styleUrl: './vercomentariooutfit.component.css'
})
export class VercomentariooutfitComponent {
  dataSource: MatTableDataSource<Comentariooutfit> = new MatTableDataSource();

  expandedCard: any = null;

  verMas(comment: any): void {
    this.expandedCard = comment;
  }

  regresar(): void {
    this.expandedCard = null;
  }

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
