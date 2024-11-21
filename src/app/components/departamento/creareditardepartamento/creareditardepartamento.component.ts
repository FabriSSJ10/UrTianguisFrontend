import { Component, OnInit } from '@angular/core';
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
import { Departamento } from '../../../models/Departamento';
import { DepartamentoService } from '../../../services/departamento.service';
@Component({
  selector: 'app-creareditardepartamento',
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
  templateUrl: './creareditardepartamento.component.html',
  styleUrl: './creareditardepartamento.component.css'
})
export class CreareditardepartamentoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  departamento: Departamento = new Departamento();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private dS: DepartamentoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hdepartamento: ['', [Validators.required, Validators.maxLength(80)]],
    });
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.departamento = data;
        this.form.patchValue({
          hcodigo: this.departamento.id_departamento,
          hdepartamento: this.departamento.departamento
        });
      });
    }
  }

  insertar(): void {
    if (this.form.valid) {
      this.departamento.id_departamento = this.form.value.hcodigo;
      this.departamento.departamento = this.form.value.hdepartamento;
      if (this.edicion) {
        this.dS.update(this.departamento).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      } else {
        this.dS.insert(this.departamento).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['departamentos']);
  }
}
