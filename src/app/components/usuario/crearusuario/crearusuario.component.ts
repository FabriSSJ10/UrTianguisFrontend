import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Departamento } from '../../../models/Departamento';
import { DepartamentoService } from '../../../services/departamento.service';
import { CommonModule } from '@angular/common';
import * as bcrypt from 'bcryptjs'; 

@Component({
  selector: 'app-crearusuario',
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
  templateUrl: './crearusuario.component.html',
  styleUrl: './crearusuario.component.css'
})
export class CrearusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false
  id: number=0;
  listaDepartamentos: Departamento[]=[];
  usua:Usuario= new Usuario();
  listaEnable: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Si' },
    { value: false, viewValue: 'No' },
  ];
  listaSexo: { value: string; viewValue: string }[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private router: Router,
    private dS: DepartamentoService,
    private route:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hid: [''],
      hnombre: ['', [Validators.required, Validators.maxLength(30)]],
      hapellido: ['', [Validators.required, Validators.maxLength(30)]],
      hcorreo: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      hsexo: ['', Validators.required],
      hdni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      hpassword: ['', [Validators.required, Validators.maxLength(500)]],
      hfecha_Nacimiento: ['', [Validators.required, this.validarFechaNacimiento]],
      htelefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      husername: ['', [Validators.required, Validators.maxLength(30)]],
      henabled: [true, Validators.required],
      hi_fecha_creacion: [new Date(), Validators.required],
      hi_fecha_modificacion: [new Date(), Validators.required],
      hi_creado_por: ['FADMIN', Validators.required],
      hi_modificado_por: ['FADMIN', Validators.required],
      hdp: ['', Validators.required],
      });
      this.dS.list().subscribe((data) => {
        this.listaDepartamentos = data;
      });
  }

  insertar(): void {
    if (this.form.valid) {
      this.form.patchValue({
          hi_fecha_creacion: new Date(),
          hi_fecha_modificacion: new Date(),
        });
      const usuario: Usuario = this.form.value;
      usuario.password = bcrypt.hashSync(this.form.value.hpassword, 12);
      this.usua.id_usuario=this.form.value.hid;
      this.usua.nombre=this.form.value.hnombre;
      this.usua.apellido=this.form.value.hapellido;
      this.usua.correo=this.form.value.hcorreo;
      this.usua.sexo=this.form.value.hsexo;
      this.usua.dni=this.form.value.hdni;
      this.usua.password=this.form.value.hpassword;
      this.usua.fecha_Nacimiento=this.form.value.hfecha_Nacimiento;
      this.usua.telefono=this.form.value.htelefono;
      this.usua.username=this.form.value.husername;
      this.usua.enabled=this.form.value.henabled;
      this.usua.i_fecha_creacion=this.form.value.hi_fecha_creacion;
      this.usua.i_fecha_modificacion=this.form.value.hi_fecha_modificacion;
      this.usua.i_creado_por=this.form.value.hi_creado_por;
      this.usua.i_modificado_por=this.form.value.hi_modificado_por;
      this.usua.dp.id_departamento=this.form.value.hdp;
      
      if (this.edicion) {
        this.form.patchValue({
          hi_fecha_modificacion: new Date(), 
        });
        this.uS.update(this.usua).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
        this.router.navigate(['usuarios']);
      } else {
      this.uS.insert(this.usua).subscribe((data) => {
        this.uS.list().subscribe((d) => {
          this.uS.setList(d);
        });
      });
    }
      this.router.navigate(['login']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_usuario),
          hnombre: new FormControl(data.nombre),
          hapellido: new FormControl(data.apellido),
          hcorreo: new FormControl(data.correo),
          hsexo: new FormControl(data.sexo),
          hdni: new FormControl(data.dni),
          hpassword: new FormControl(data.password),
          hfecha_Nacimiento: new FormControl(data.fecha_Nacimiento),
          htelefono: new FormControl(data.telefono),
          husername: new FormControl(data.username),
          henabled: new FormControl(data.enabled),
          hi_fecha_creacion: new FormControl(data.i_fecha_creacion),
          hi_fecha_modificacion: new FormControl(data.i_fecha_modificacion),
          hi_creado_por: new FormControl(data.i_creado_por),
          hi_modificado_por: new FormControl(data.i_modificado_por),
          hdp: new FormControl(data.dp.id_departamento),
        });
      });
    }
  }

  validarFechaNacimiento(control: FormControl) {
    const fechaSeleccionada = new Date(control.value);
    const fechaActual = new Date();
    if (fechaSeleccionada > fechaActual) {
      return { fechaFutura: true };
    }
    return null;
  }
  
}
