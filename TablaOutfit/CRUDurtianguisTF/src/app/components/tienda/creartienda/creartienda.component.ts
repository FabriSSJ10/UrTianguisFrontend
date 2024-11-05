import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { Tienda } from '../../../models/Tienda';
import { TiendaService } from '../../../services/tienda.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creartienda',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './creartienda.component.html',
  styleUrl: './creartienda.component.css'
})
export class CreartiendaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuario[]=[];
  tiend:Tienda= new Tienda();
  constructor(
    private formBuilder: FormBuilder,
    private tS: TiendaService,
    private router: Router,
    private uS: UsuarioService,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnombre:['',Validators.required],
      haltitud:['',Validators.required],
      hlatitud:['',Validators.required],
      hlogo:['',Validators.required],
      hus:['',Validators.required],
      });
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
  }
  insertar(): void {
    if (this.form.valid) {
      this.tiend.nombre=this.form.value.hnombre;
      this.tiend.altitud=this.form.value.haltitud;
      this.tiend.latitud=this.form.value.hlatitud;
      this.tiend.logo=this.form.value.hlogo;
      this.tiend.us.id_usuario=this.form.value.hus;
      
      this.tS.insert(this.tiend).subscribe((data) => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        });
      });
      this.router.navigate(['tiendas']);
    }
  }
}

