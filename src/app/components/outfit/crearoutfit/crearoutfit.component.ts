import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { PrendaService } from '../../../services/prenda.service';
import { TipoocasionService } from '../../../services/tipoocasion.service';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  templateUrl: './crearoutfit.component.html',
  styleUrl: './crearoutfit.component.css'
})
export class CrearoutfitComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaUsuario: Usuario[] = [];
  listaPrenda: Prenda[] = [];
  listaTocacion: Tipoocasion[] = [];
  out: Outfit = new Outfit();
  id: number = 0;
  edicion: boolean = false;

  // Variables para el nombre del usuario y las fechas
  nombreUsuario: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private oS: OutfitService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private pS: PrendaService,
    private toS: TipoocasionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      this.init();
    });

    this.form = this.formBuilder.group({
      hid: [''],
      hnombre: ['', [Validators.required, Validators.maxLength(50)]],
      hdescripcion: ['', [Validators.required, Validators.maxLength(500)]],
      himagen: ['', Validators.required],
      hi_fecha_creacion: [new Date(), Validators.required],
      hi_fecha_modificacion: [new Date(), Validators.required],
      hi_creador_por: [this.nombreUsuario, Validators.required],
      hi_modificado_por: [this.nombreUsuario, Validators.required],
      hus: ['', Validators.required],
      hpr: ['', Validators.required],
      hto: ['', Validators.required],
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
      this.out.id_outfit = this.form.value.hid;
      this.out.nombre = this.form.value.hnombre;
      this.out.descripcion = this.form.value.hdescripcion;
      this.out.imagen = this.form.value.himagen;
      this.out.i_fecha_creacion = this.form.value.hi_fecha_creacion;
      this.out.i_fecha_modificacion = this.form.value.hi_fecha_modificacion;
      this.out.i_creador_por = this.form.value.hi_creador_por;
      this.out.i_modificado_por = this.form.value.hi_modificado_por;
      this.out.us.id_usuario = this.form.value.hus;
      this.out.pr.id_prenda = this.form.value.hpr;
      this.out.to.id_tipo_ocasion = this.form.value.hto;

      if (this.edicion) {
        this.oS.update(this.out).subscribe((data) => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
          });
        });
      } else {
        this.oS.insert(this.out).subscribe((data) => {
          this.oS.list().subscribe((d) => {
            this.oS.setList(d);
          });
        });
      }

      this.router.navigate(['outfits']);
    }
  }

  init() {
    if (this.edicion) {
      this.oS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_outfit),
          hnombre: new FormControl(data.nombre, Validators.required),
          hdescripcion: new FormControl(data.descripcion, Validators.required),
          himagen: new FormControl(data.imagen, Validators.required),
          hi_fecha_creacion: new FormControl(data.i_fecha_creacion, Validators.required),
          hi_fecha_modificacion: new FormControl(data.i_fecha_modificacion, Validators.required),
          hi_creador_por: new FormControl(data.i_creador_por, Validators.required),
          hi_modificado_por: new FormControl(data.i_modificado_por, Validators.required),
          hus: new FormControl(data.us.id_usuario, Validators.required),
          hpr: new FormControl(data.pr.id_prenda, Validators.required),
          hto: new FormControl(data.to.id_tipo_ocasion, Validators.required),
        });
        
      });
    }
  }

  actualizarNombreUsuario(event: any): void {
    const usuario = this.listaUsuario.find(u => u.id_usuario === event.value);
    if (usuario) {
      this.nombreUsuario = usuario.nombre;
      this.form.patchValue({
        hi_creador_por: this.nombreUsuario,
        hi_modificado_por: this.nombreUsuario
      });
    }
  }
}
