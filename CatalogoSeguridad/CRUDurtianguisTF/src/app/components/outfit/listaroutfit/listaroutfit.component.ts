import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Outfit } from '../../../models/Outfit';
import { OutfitService } from '../../../services/outfit.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listaroutfit',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, RouterLink, CommonModule, MatCardModule],
  templateUrl: './listaroutfit.component.html',
  styleUrl: './listaroutfit.component.css'
})
export class ListaroutfitComponent implements OnInit{
  dataSource: MatTableDataSource<Outfit> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7','c8','c9','c10','c11','c12','accion01','accion02'];

  constructor(private oS: OutfitService) {}

  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.oS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.oS.delete(id).subscribe((data) => {
      this.oS.list().subscribe((data) => {
        this.oS.setList(data);
      });
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
