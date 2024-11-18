import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tipopago } from '../../../models/Tipopago';
import { Pago } from '../../../models/Pago';
import { PagoService } from '../../../services/pago.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipopagoService } from '../../../services/tipopago.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creareditarpago',
  standalone: true,
  imports: [MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule, CommonModule],
  templateUrl: './creareditarpago.component.html',
  styleUrl: './creareditarpago.component.css'
})
export class CreareditarpagoComponent {
  form: FormGroup = new FormGroup({});
  listaTipoPagos:Tipopago[] = [  ];
  pago: Pago = new Pago();
  edicion: boolean = false
  id: number=0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pS: PagoService,
    private tpS:TipopagoService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    
    this.form=this.formBuilder.group({
      hid:[''],
      hmonto:['',Validators.required],
      hfechapago:['',Validators.required],
      hnumtarjeta:[],
      hfechavencimiento:[],
      hcodvalidacion:[],
      htelefono:[],
      htipopago:['',Validators.required],
    });
    this.tpS.list().subscribe(data=>{
      this.listaTipoPagos=data;
    })
  }
  insertar(): void {
    if (this.form.valid) {
      this.pago.id_pago=this.form.value.hid;
      this.pago.monto=this.form.value.hmonto;
      this.pago.fecha_pago=this.form.value.hfechapago;
      this.pago.num_tarjeta_cliente=this.form.value.hnumtarjeta;
      this.pago.fecha_vencimiento=this.form.value.hfechavencimiento;
      this.pago.cod_validacion=this.form.value.hcodvalidacion;
      this.pago.telefono_cliente=this.form.value.htelefono;
      this.pago.tp.id_tipopago=this.form.value.htipopago;
      if (this.edicion) {
        this.pS.update(this.pago).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
      this.pS.insert(this.pago).subscribe((data) => {
        this.pS.list().subscribe((d) => {
          this.pS.setList(d);
        });
      });
      }
      this.router.navigate(['pagos']);
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_pago),
          hmonto: new FormControl(data.monto),
          hfechapago: new FormControl(data.fecha_pago),
          hnumtarjeta: new FormControl(data.num_tarjeta_cliente),
          hfechavencimiento: new FormControl(data.fecha_vencimiento),
          hcodvalidacion: new FormControl(data.cod_validacion),
          htelefono: new FormControl(data.telefono_cliente),
          htipopago: new FormControl(data.tp),
        });
      });
    }
  }
  
}
