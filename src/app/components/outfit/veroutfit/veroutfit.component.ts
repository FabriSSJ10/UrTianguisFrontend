import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Outfit } from '../../../models/Outfit';
import { OutfitService } from '../../../services/outfit.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-veroutfit',
  standalone: true,
  imports: [MatPaginatorModule, MatIconModule, MatTableModule, CommonModule, MatCardModule],
  templateUrl: './veroutfit.component.html',
  styleUrl: './veroutfit.component.css'
})
export class VeroutfitComponent {
  dataSource: MatTableDataSource<Outfit> = new MatTableDataSource();

  expandedCard: number | null = null;

  verMas(id: number): void {
    this.expandedCard = id; 
  }

  regresar(): void {
    this.expandedCard = null; 
  }

  constructor(private oS: OutfitService) {}

  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.oS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
