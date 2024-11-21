import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Tipo_prenda } from '../../../models/Tipoprenda';
import { Tienda } from '../../../models/Tienda';
import { Prenda } from '../../../models/Prenda';
import { PrendaService } from '../../../services/prenda.service';
import { TipoPrendaService } from '../../../services/tipoprenda.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TiendaService } from '../../../services/tienda.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crearprenda',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule
  ],
  templateUrl: './crearprenda.component.html',
  styleUrl: './crearprenda.component.css'
})
export class CrearprendaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaTipoPrendas:Tipo_prenda[] = [];
  listaTiendas:Tienda[] = [  ];
  prenda: Prenda = new Prenda();
  listaPrenda: Prenda[]=[];
  id:number=0
  edicion:boolean=false

  constructor(
    private pS: PrendaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tpS:TipoPrendaService,
    private tS:TiendaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null

      this.init()
    })

    this.form=this.formBuilder.group({
      hid: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hprecio: ['', [Validators.required, Validators.min(0)]],
      htalla: ['', Validators.required],
      hstock: ['', [Validators.required, Validators.min(0)]],
      hvecesusada: ['', [Validators.required, Validators.min(0)]],
      himagen: ['', Validators.required],
      hfechacreacion: [new Date(), [Validators.required]],
      hfechamodificacion: [new Date(), [Validators.required]],
      hcreadopor: ['FADMIN', [Validators.required]],
      hmodificadopor: ['FADMIN', [Validators.required]],
      htipoprenda: ['', Validators.required],
      htienda: ['', Validators.required],
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
      this.form.patchValue({
        hi_fecha_creacion: new Date(),
        hi_fecha_modificacion: new Date(),
      });
      this.prenda.id_prenda=this.form.value.hid;
      this.prenda.nombre=this.form.value.hnombre;
      this.prenda.descripcion=this.form.value.hdescripcion;
      this.prenda.precio=this.form.value.hprecio;
      this.prenda.talla=this.form.value.htalla;
      this.prenda.stock=this.form.value.hstock;
      this.prenda.veces_usada=this.form.value.hvecesusada;
      this.prenda.imagen=this.form.value.himagen;
      this.prenda.i_fecha_creacion=this.form.value.hfechacreacion;
      this.prenda.i_fecha_modificacion=this.form.value.hfechamodificacion;
      this.prenda.i_creado_por=this.form.value.hcreadopor;
      this.prenda.i_modificado_por=this.form.value.hmodificadopor;
      this.prenda.tp.id_tipo_prenda=this.form.value.htipoprenda;
      this.prenda.ti.id_tienda=this.form.value.htienda;
      if (this.edicion) {
        this.form.patchValue({
          hi_fecha_modificacion: new Date(), 
        });
        this.pS.update(this.prenda).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
      this.pS.insert(this.prenda).subscribe((data) => {
        this.pS.list().subscribe((d) => {
          this.pS.setList(d);
        });
      });
      }
      this.router.navigate(['prendas']);
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_prenda),
          hnombre: new FormControl(data.nombre),
          hdescripcion: new FormControl(data.descripcion),
          hprecio: new FormControl(data.precio),
          htalla: new FormControl(data.talla),
          hstock: new FormControl(data.stock),
          hvecesusada: new FormControl(data.veces_usada),
          himagen: new FormControl(data.imagen),
          hfechacreacion: new FormControl(data.i_fecha_creacion),
          hfechamodificacion: new FormControl(data.i_fecha_modificacion),
          hcreadopor: new FormControl(data.i_creado_por),
          hmodificadopor: new FormControl(data.i_modificado_por),
          htipoprenda: new FormControl(data.tp.id_tipo_prenda),
          htienda: new FormControl(data.ti.id_tienda),    
        });
      });
    }
  }

  
}
