import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Outfit } from '../../../models/Outfit';
import { Catalogo } from '../../../models/Catalogo';
import { CatalogoService } from '../../../services/catalogo.service';
import { Router } from '@angular/router';
import { OutfitService } from '../../../services/outfit.service';

@Component({
  selector: 'app-crearcatalogo',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './crearcatalogo.component.html',
  styleUrl: './crearcatalogo.component.css'
})
export class CrearcatalogoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaOutfit: Outfit[]=[];
  catal:Catalogo= new Catalogo();
  constructor(
    private formBuilder: FormBuilder,
    private cS: CatalogoService,
    private router: Router,
    private oS: OutfitService,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hi_fecha_creacion:['',Validators.required],
      hi_fecha_modificacion:['',Validators.required],
      hou:['',Validators.required],
      });
      this.oS.list().subscribe((data) => {
        this.listaOutfit = data;
      });
  }
  insertar(): void {
    if (this.form.valid) {
      this.catal.i_fecha_creacion=this.form.value.hi_fecha_creacion;
      this.catal.i_fecha_modificacion=this.form.value.hi_fecha_modificacion;
      this.catal.ou.id_outfit=this.form.value.hou;
      
      this.cS.insert(this.catal).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['catalogos']);
    }
  }
}
