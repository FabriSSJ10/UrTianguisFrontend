import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Tipo_prenda } from '../../../models/Tipoprenda';
import { Tienda } from '../../../models/Tienda';
import { Prenda } from '../../../models/Prenda';
import { PrendaService } from '../../../services/prenda.service';
import { TipoPrendaService } from '../../../services/tipoprenda.service';
import { Router } from '@angular/router';
import { TiendaService } from '../../../services/tienda.service';

@Component({
  selector: 'app-crearprenda',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './crearprenda.component.html',
  styleUrl: './crearprenda.component.css'
})
export class CrearprendaComponent implements OnInit{
  form: FormGroup = new FormGroup({});

  listaTipoPrendas:Tipo_prenda[] = [];
  listaTiendas:Tienda[] = [  ];

  prenda: Prenda = new Prenda();

  constructor(
    private pS: PrendaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tpS:TipoPrendaService,
    private tS:TiendaService,
  ) {}

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      hnombre:['',Validators.required],
      hdescripcion:['',Validators.required],
      hprecio:['',Validators.required],
      htalla:['',Validators.required],
      hstock:['',Validators.required],
      hvecesusada:['',Validators.required],
      hfechacreacion:['',Validators.required],
      hfechamodificacion:['',Validators.required],
      hcreadopor:['',Validators.required],
      hmodificadopor:['',Validators.required],
      htipoprenda:['',Validators.required],
      htienda:['',Validators.required],
    });
    this.tpS.list().subscribe(data=>{
      this.listaTipoPrendas=data;
    })
    this.tS.list().subscribe(data=>{
      this.listaTiendas=data;
    })
  }
  insertar():void{
    if(this.form.valid){
      this.prenda.nombre=this.form.value.hnombre;
      this.prenda.descripcion=this.form.value.hdescripcion;
      this.prenda.precio=this.form.value.hprecio;
      this.prenda.talla=this.form.value.htalla;
      this.prenda.stock=this.form.value.hstock;
      this.prenda.veces_usada=this.form.value.hvecesusada;
      this.prenda.i_fecha_creacion=this.form.value.hfechacreacion;
      this.prenda.i_fecha_modificacion=this.form.value.hfechamodificacion;
      this.prenda.i_creado_por=this.form.value.hcreadopor;
      this.prenda.i_modificado_por=this.form.value.hmodificadopor;
      this.prenda.tp.id_tipo_prenda=this.form.value.htipoprenda;
      this.prenda.ti.id_tienda=this.form.value.htienda;
      this.pS.insert(this.prenda).subscribe((data)=>{
        this.pS.getList().subscribe((data)=>{
          this.pS.setList(data);
        });
      });
      this.router.navigate(['prendas']);
    }
  }
}
