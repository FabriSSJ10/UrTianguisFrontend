import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crearrol',
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
  templateUrl: './crearrol.component.html',
  styleUrl: './crearrol.component.css',
})
export class CrearrolComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuario: Usuario[] = [];
  maint: Rol = new Rol();
  edicion: boolean = false
  id: number=0;
  listaRoles: { value: string; viewValue: string }[] = [
    { value: 'CLIENTE', viewValue: 'CLIENTE' },
    { value: 'VENDEDOR', viewValue: 'VENDEDOR' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private rS: RolService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hid: [''],
      hrol: ['',Validators.required],
      hus: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.maint.id_rol = this.form.value.hid;
      this.maint.rol = this.form.value.hrol;
      this.maint.uS.id_usuario = this.form.value.hus;
      if (this.edicion) {
        this.rS.update(this.maint).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
      this.rS.insert(this.maint).subscribe((data) => {
        this.rS.list().subscribe((d) => {
          this.rS.setList(d);
        });
      });
      }
      this.router.navigate(['roles']);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_rol),
          hrol: new FormControl(data.rol),
          hus: new FormControl(data.uS.id_usuario),
        });
      });
    }
  }
}
