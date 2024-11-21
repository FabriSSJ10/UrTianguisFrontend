import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { Tienda } from '../../../models/Tienda';
import { TiendaService } from '../../../services/tienda.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  templateUrl: './creartienda.component.html',
  styleUrl: './creartienda.component.css'
})
export class CreartiendaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuario[]=[];
  tiend:Tienda= new Tienda();
  edicion: boolean = false
  id: number=0;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tS: TiendaService,
    private uS: UsuarioService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    
    this.form = this.formBuilder.group({
      hid:[''],
      hnombre: [
        '',
        [Validators.required, Validators.maxLength(50)] 
      ],
      haltitud: [
        '',
        [
          Validators.required, 
          Validators.pattern(/^[-+]?([0-9]*[.])?[0-9]+$/) 
        ]
      ],
      hlatitud: [
        '',
        [
          Validators.required, 
          Validators.pattern(/^[-+]?([0-9]*[.])?[0-9]+$/),
          Validators.min(-90), 
          Validators.max(90)  
        ]
      ],
      hlogo: ['', Validators.required],
      hus: ['', Validators.required]
      });
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
  }

  insertar(): void {
    if (this.form.valid) {
      this.tiend.id_tienda=this.form.value.hid;
      this.tiend.nombre=this.form.value.hnombre;
      this.tiend.altitud=this.form.value.haltitud;
      this.tiend.latitud=this.form.value.hlatitud;
      this.tiend.logo=this.form.value.hlogo;
      this.tiend.us.id_usuario=this.form.value.hus;
      
      if (this.edicion) {
        this.tS.update(this.tiend).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
      this.tS.insert(this.tiend).subscribe((data) => {
        this.tS.list().subscribe((d) => {
          this.tS.setList(d);
        });
      });
    }
      this.router.navigate(['tiendas']);
    }
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_tienda),
          hnombre: new FormControl(data.nombre),
          haltitud: new FormControl(data.altitud),
          hlatitud: new FormControl(data.latitud),
          hlogo: new FormControl(data.logo),
          hus: new FormControl(data.us.id_usuario),
        });
      });
    }
  }
}
