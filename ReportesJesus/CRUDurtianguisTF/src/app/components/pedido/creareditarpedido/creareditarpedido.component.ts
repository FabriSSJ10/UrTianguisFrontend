import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pedido } from '../../../models/Pedido';
import { PedidoService } from '../../../services/pedido.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Notificacion } from '../../../models/Notificacion';
import { Pago } from '../../../models/Pago';
import { NotificacionService } from '../../../services/notificacion.service';
import { PagoService } from '../../../services/pago.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creareditarpedido',
  standalone: true,
  imports: [MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule, CommonModule],
  templateUrl: './creareditarpedido.component.html',
  styleUrl: './creareditarpedido.component.css'
})
export class CreareditarpedidoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  edicion: boolean = false
  id: number=0;

  listaEstados: { value: string; viewValue: string }[] = [
    { value: 'Cancelado', viewValue: 'Cancelado' },
    { value: 'En camino', viewValue: 'En camino' },
    { value: 'Entregado', viewValue: 'Entregado' },
  ];
  listaPagos:Pago[] = [];
  listaUsuarios:Usuario[] = [];
  listaNotificaciones:Notificacion[] = [];
  ped: Pedido = new Pedido();

  constructor(
    private pS: PedidoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pgS:PagoService,
    private uS:UsuarioService,
    private nS:NotificacionService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form=this.formBuilder.group({
      hid:[''],
      hestado_pedido:['',Validators.required],
      hfecha_solicitud:['',Validators.required],
      hfecha_entrega:['',Validators.required],
      hi_fecha_creacion:['',Validators.required],
      hi_creado_por:['',Validators.required],
      hpa:['',Validators.required],
      hus:['',Validators.required],
      hno:['',Validators.required],
    });
    this.pgS.list().subscribe(data=>{
      this.listaPagos=data;
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data;
    })
    this.nS.list().subscribe(data=>{
      this.listaNotificaciones=data;
    })
  }
  insertar():void{
    if(this.form.valid){
      this.ped.id_pedido=this.form.value.hid;
      this.ped.estado_pedido=this.form.value.hestado_pedido;
      this.ped.fecha_solicitud=this.form.value.hfecha_solicitud;
      this.ped.fecha_entrega=this.form.value.hfecha_entrega;
      this.ped.i_fecha_creacion=this.form.value.hi_fecha_creacion;
      this.ped.i_creado_por=this.form.value.hi_creado_por;
      this.ped.pa.id_pago=this.form.value.hpa;
      this.ped.us.id_usuario=this.form.value.hus;
      this.ped.no.id_notificacion=this.form.value.hno;
      if (this.edicion) {
        this.pS.update(this.ped).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
      this.pS.insert(this.ped).subscribe((data) => {
        this.pS.list().subscribe((d) => {
          this.pS.setList(d);
        });
      });
      }
      this.router.navigate(['pedidos']);
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_pedido),
          hestado_pedido: new FormControl(data.estado_pedido),
          hfecha_solicitud: new FormControl(data.fecha_solicitud),
          hfecha_entrega: new FormControl(data.fecha_entrega),
          hi_fecha_creacion: new FormControl(data.i_fecha_creacion),
          hi_creado_por: new FormControl(data.i_creado_por),
          hpa: new FormControl(data.pa),
          hus: new FormControl(data.us),
          hno: new FormControl(data.no),
        });
      });
    }
  }
}
