import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { Comentariooutfit } from '../../../models/Comentariooutfit';
import { Outfit } from '../../../models/Outfit';
import { ComentariooutfitService } from '../../../services/comentariooutfit.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { OutfitService } from '../../../services/outfit.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-crearcomentariooutfit',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule, 
    MatCardModule
  ],
  templateUrl: './crearcomentariooutfit.component.html',
  styleUrl: './crearcomentariooutfit.component.css'
})
export class CrearcomentariooutfitComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuario[]=[];
  listaoutfit: Outfit[]=[];
  edicion: boolean = false
  id: number=0;
  cO:Comentariooutfit= new Comentariooutfit();
  constructor(
    private formBuilder: FormBuilder,
    private comS: ComentariooutfitService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private outS: OutfitService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    
    this.form = this.formBuilder.group({
      hid:[''],
      hcomentario:['',Validators.required],
      hus:['',Validators.required],
      hou:['',Validators.required],
      });
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
      this.outS.list().subscribe((data) => {
        this.listaoutfit = data;
      });
  }
  insertar(): void {
    if (this.form.valid) {
      this.cO.id_comentario=this.form.value.hid;
      this.cO.comentario=this.form.value.hcomentario;
      this.cO.us.id_usuario=this.form.value.hus;
      this.cO.ou.id_outfit=this.form.value.hou;
      
      if (this.edicion) {
        this.comS.update(this.cO).subscribe((data) => {
          this.comS.list().subscribe((data) => {
            this.comS.setList(data);
          });
        });
      } else {
      this.comS.insert(this.cO).subscribe((data) => {
        this.comS.list().subscribe((d) => {
          this.comS.setList(d);
        });
      });
    }
      this.router.navigate(['comentarios_outfit']);
    }
  }

  init() {
    if (this.edicion) {
      this.comS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_comentario),
          hcomentario: new FormControl(data.comentario),
          hus: new FormControl(data.us),
          hou: new FormControl(data.ou),
        });
      });
    }
  }
}
