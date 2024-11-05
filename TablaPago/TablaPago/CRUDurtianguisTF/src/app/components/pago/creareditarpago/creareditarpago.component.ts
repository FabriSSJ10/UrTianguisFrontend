import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tipopago } from '../../../models/Tipopago';
import { Pago } from '../../../models/Pago';
import { PagoService } from '../../../services/pago.service';
import { Router } from '@angular/router';
import { TipopagoService } from '../../../services/tipopago.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creareditarpago',
  standalone: true,
  imports: [MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule],
  templateUrl: './creareditarpago.component.html',
  styleUrl: './creareditarpago.component.css'
})
export class CreareditarpagoComponent {
  form: FormGroup = new FormGroup({});

  listaTipoPagos:Tipopago[] = [  ];
  pago: Pago = new Pago();

  constructor(
    private pS: PagoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tpS:TipopagoService,
  ) {}

  ngOnInit(): void {
    this.form=this.formBuilder.group({
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
  insertar():void{
    if(this.form.valid){
      this.pago.monto=this.form.value.hmonto;
      this.pago.fecha_pago=this.form.value.hfechapago;
      this.pago.num_tarjeta_cliente=this.form.value.hnumtarjeta;
      this.pago.fecha_vencimiento=this.form.value.hfechavencimiento;
      this.pago.cod_validacion=this.form.value.hcodvalidacion;
      this.pago.telefono_cliente=this.form.value.htelefono;
      this.pago.tp.id_tipo_pago=this.form.value.htipopago;
      this.pS.insert(this.pago).subscribe((data)=>{
        this.pS.getList().subscribe((data)=>{
          this.pS.setList(data);
        });
      });
      this.router.navigate(['pagos']);
    }
  }
}
