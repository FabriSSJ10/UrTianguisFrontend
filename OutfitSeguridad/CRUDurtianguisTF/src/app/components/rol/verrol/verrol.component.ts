import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/Rol';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verrol',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, CommonModule, MatCardModule],

  templateUrl: './verrol.component.html',
  styleUrl: './verrol.component.css'
})
export class VerrolComponent {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  constructor(private mS: RolService) {}
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent): void {
    this.dataSource.paginator = this.paginator; 
  }
}
