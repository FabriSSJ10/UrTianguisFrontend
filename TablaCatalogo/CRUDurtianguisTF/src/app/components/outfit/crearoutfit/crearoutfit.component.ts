import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { Prenda } from '../../../models/Prenda';
import { Tipoocasion } from '../../../models/Tipoocasion';
import { Outfit } from '../../../models/Outfit';
import { OutfitService } from '../../../services/outfit.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { PrendaService } from '../../../services/prenda.service';
import { TipoocasionService } from '../../../services/tipoocasion.service';

@Component({
  selector: 'app-crearoutfit',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './crearoutfit.component.html',
  styleUrl: './crearoutfit.component.css'
})
export class CrearoutfitComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaUsuario: Usuario[]=[];
  listaPrenda: Prenda[]=[];
  listaTocacion: Tipoocasion[]=[];
  out:Outfit= new Outfit();

  constructor(
    private formBuilder: FormBuilder,
    private oS: OutfitService,
    private router: Router,
    private uS: UsuarioService,
    private pS: PrendaService,
    private toS: TipoocasionService,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnombre:['',Validators.required],
      hdescripcion:['',Validators.required],
      hcalificacion:['',Validators.required],
      himagen:['',Validators.required],
      hi_fecha_creacion:['',Validators.required],
      hi_fecha_modificacion:['',Validators.required],
      hi_creador_por:['',Validators.required],
      hi_modificado_por:['',Validators.required],
      hus:['',Validators.required],
      hpr:['',Validators.required],
      hto:['',Validators.required],
      });
      this.uS.list().subscribe((data) => {
        this.listaUsuario = data;
      });
      this.pS.list().subscribe((data) => {
        this.listaPrenda = data;
      });
      this.toS.list().subscribe((data) => {
        this.listaTocacion = data;
      });
  }
  
  insertar(): void {
    if (this.form.valid) {
      this.out.nombre=this.form.value.hnombre;
      this.out.descripcion=this.form.value.hdescripcion;
      this.out.calificacion=this.form.value.hcalificacion;
      this.out.imagen=this.form.value.himagen;
      this.out.i_fecha_creacion=this.form.value.hi_fecha_creacion;
      this.out.i_fecha_modificacion=this.form.value.hi_fecha_modificacion;
      this.out.i_creador_por=this.form.value.hi_creador_por;
      this.out.i_modificado_por=this.form.value.hi_modificado_por;
      this.out.us.id_usuario=this.form.value.hus;
      this.out.pr.id_prenda=this.form.value.hpr;
      this.out.to.id_tipo_ocasion=this.form.value.hto;
      this.oS.insert(this.out).subscribe((data) => {
        this.oS.getList().subscribe((data) => {
          this.oS.setList(data);
        });
      });
      this.router.navigate(['outfits']);
    }
  }
}
