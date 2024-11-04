import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

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
  ],
  templateUrl: './crearrol.component.html',
  styleUrl: './crearrol.component.css',
})
export class CrearrolComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuario: Usuario[] = [];
  maint: Rol = new Rol();

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolService,
    private router: Router,
    private uS: UsuarioService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hrol: ['', Validators.required],
      hus: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.maint.rol = this.form.value.hrol;
      this.maint.uS.id_usuario = this.form.value.hus;
      this.rS.insert(this.maint).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['roles']);
    }
  }
}
