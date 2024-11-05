import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Departamento } from '../../../models/Departamento';
import { DepartamentoService } from '../../../services/departamento.service';

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
  ],
  templateUrl: './crearusuario.component.html',
  styleUrl: './crearusuario.component.css'
})
export class CrearusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaDepartamentos: Departamento[]=[];
  usua:Usuario= new Usuario();
  listaEnable:{value:boolean,viewValue:string}[]=[
    { value: true, viewValue: 'Si'},
    { value: false, viewValue: 'No'},
  ];
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private router: Router,
    private dS: DepartamentoService,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnombre:['',Validators.required],
      hapellido:['',Validators.required],
      hcorreo:['',Validators.required],
      hsexo:['',Validators.required],
      hdni:['',Validators.required],
      hpassword:['',Validators.required],
      hfecha_Nacimiento:['',Validators.required],
      htelefono:['',Validators.required],
      husername:['',Validators.required],
      henabled:['',Validators.required],
      hi_fecha_creacion:['',Validators.required],
      hi_fecha_modificacion:['',Validators.required],
      hi_creado_por:['',Validators.required],
      hi_modificado_por:['',Validators.required],
      hdp:['',Validators.required],
      });
      this.dS.list().subscribe((data) => {
        this.listaDepartamentos = data;
      });
  }
  
  insertar(): void {
    if (this.form.valid) {
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
      this.uS.insert(this.usua).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['usuarios']);
    }
  }
}
