import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { Catalogo } from '../../../models/Catalogo';
import { CatalogoService } from '../../../services/catalogo.service';

@Component({
  selector: 'app-listarcatalogo',
  standalone: true,
  imports: [RouterOutlet,ListarcatalogoComponent,MatTableModule, MatIconModule],
  templateUrl: './listarcatalogo.component.html',
  styleUrl: './listarcatalogo.component.css'
})
export class ListarcatalogoComponent implements OnInit {
  dataSource: MatTableDataSource<Catalogo> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4']
  constructor(private cS: CatalogoService) {}
  ngOnInit(): void {
    this.cS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.cS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.cS.delete(id).subscribe((data)=>{
      this.cS.list().subscribe((data)=>{
        this.cS.setList(data);
    })
  })}
}
