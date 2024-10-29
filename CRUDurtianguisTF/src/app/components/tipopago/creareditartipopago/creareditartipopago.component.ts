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
import { Tipopago } from '../../../models/Tipopago';
import { TipopagoService } from '../../../services/tipopago.service';

@Component({
  selector: 'app-creareditartipopago',
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
  templateUrl: './creareditartipopago.component.html',
  styleUrl: './creareditartipopago.component.css',
})
export class CreareditartipopagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipopago: Tipopago = new Tipopago();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private tS: TipopagoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      htipo_Pago: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.tipopago.id_tipo_pago = this.form.value.hcodigo;
      this.tipopago.tipo_pago = this.form.value.htipo_Pago;
      if (this.edicion) {
        this.tS.update(this.tipopago).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.tipopago).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['tipospago']);
  }
  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id_tipo_pago),
          htipo_Pago: new FormControl(data.tipo_pago),
        });
      });
    }
  }
}
