import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { Comentariooutfit } from '../../../models/Comentariooutfit';
import { Outfit } from '../../../models/Outfit';
import { ComentariooutfitService } from '../../../services/comentariooutfit.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { OutfitService } from '../../../services/outfit.service';

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
  ],
  templateUrl: './crearcomentariooutfit.component.html',
  styleUrl: './crearcomentariooutfit.component.css'
})
export class CrearcomentariooutfitComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuario[]=[];
  listaoutfit: Outfit[]=[];
  cout:Comentariooutfit= new Comentariooutfit();
  constructor(
    private formBuilder: FormBuilder,
    private coutS: ComentariooutfitService,
    private router: Router,
    private uS: UsuarioService,
    private outS: OutfitService,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
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
      this.cout.comentario=this.form.value.hcomentario;
      this.cout.us.id_usuario=this.form.value.hus;
      this.cout.ou.id_outfit=this.form.value.hou;
      
      this.coutS.insert(this.cout).subscribe((data) => {
        this.coutS.list().subscribe((data) => {
          this.coutS.setList(data);
        });
      });
      this.router.navigate(['comentarios_outfit']);
    }
  }
}
