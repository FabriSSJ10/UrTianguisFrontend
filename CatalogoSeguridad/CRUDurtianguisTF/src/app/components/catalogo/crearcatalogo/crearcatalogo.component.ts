import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Outfit } from '../../../models/Outfit';
import { Catalogo } from '../../../models/Catalogo';
import { CatalogoService } from '../../../services/catalogo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OutfitService } from '../../../services/outfit.service';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  templateUrl: './crearcatalogo.component.html',
  styleUrl: './crearcatalogo.component.css'
})
export class CrearcatalogoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaOutfit: Outfit[]=[];
  catal:Catalogo= new Catalogo();
  edicion: boolean = false
  id: number=0;
  constructor(
    private formBuilder: FormBuilder,
    private cS: CatalogoService,
    private router: Router,
    private route: ActivatedRoute,
    private oS: OutfitService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    
    this.form = this.formBuilder.group({
      hid:[''],
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
      this.catal.id_catalogo=this.form.value.hid;
      this.catal.i_fecha_creacion=this.form.value.hi_fecha_creacion;
      this.catal.i_fecha_modificacion=this.form.value.hi_fecha_modificacion;
      this.catal.ou.id_outfit=this.form.value.hou;
      
      if (this.edicion) {
        this.cS.update(this.catal).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
      this.cS.insert(this.catal).subscribe((data) => {
        this.cS.list().subscribe((d) => {
          this.cS.setList(d);
        });
      });
    }
      this.router.navigate(['catalogos']);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_catalogo),
          hi_fecha_creacion: new FormControl(data.i_fecha_creacion),
          hi_fecha_modificacion: new FormControl(data.i_fecha_modificacion),
          hou: new FormControl(data.ou),
        });
      });
    }
  }
}
