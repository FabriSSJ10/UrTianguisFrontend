import { Component } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { Tipoocasion } from '../../../models/Tipoocasion';
import { TipoocasionService } from '../../../services/tipoocasion.service';

@Component({
  selector: 'app-creareditartipoocasion',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creareditartipoocasion.component.html',
  styleUrl: './creareditartipoocasion.component.css'
})
export class CreareditartipoocasionComponent {
  form: FormGroup;
  tipo_ocasion: Tipoocasion = new Tipoocasion();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private tS: TipoocasionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      htipo_ocasion: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.tipo_ocasion.id_tipo_ocasion = this.form.value.hcodigo;
      this.tipo_ocasion.tipo_ocasion = this.form.value.htipo_ocasion;
      if (this.edicion) {
        this.tS.update(this.tipo_ocasion).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.tipo_ocasion).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['tipos_ocasion']);
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.id_tipo_ocasion,
          htipo_ocasion: data.tipo_ocasion,
        });
      });
    }
  }
}
