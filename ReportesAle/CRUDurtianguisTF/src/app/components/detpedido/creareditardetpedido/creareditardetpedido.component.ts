import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Prenda } from '../../../models/Prenda';
import { Pedido } from '../../../models/Pedido';
import { Detpedido } from '../../../models/Detpedido';
import { DetpedidoService } from '../../../services/detpedido.service';
import { PedidoService } from '../../../services/pedido.service';
import { PrendaService } from '../../../services/prenda.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creareditardetpedido',
  standalone: true,
  imports: [MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule, CommonModule],
  templateUrl: './creareditardetpedido.component.html',
  styleUrl: './creareditardetpedido.component.css'
})
export class CreareditardetpedidoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  edicion: boolean = false
  id: number=0;
  listaPrendas:Prenda[] = [  ];
  listaPedidos:Pedido[] = [  ];
  det: Detpedido = new Detpedido();

  constructor(
    private dS: DetpedidoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private prS:PrendaService,
    private peS:PedidoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form=this.formBuilder.group({
      hid:[''],
      hcantidad:['',Validators.required],
      hprecio_total:['',Validators.required],
      hsub_total:['',Validators.required],
      hpr:['',Validators.required],
      hpe:['',Validators.required],
    });
    this.prS.list().subscribe(data=>{
      this.listaPrendas=data;
    })
    this.peS.list().subscribe(data=>{
      this.listaPedidos=data;
    })
  }

  insertar(): void {
    if (this.form.valid) {
      this.det.id_det_pedido=this.form.value.hid;
      this.det.cantidad=this.form.value.hcantidad;
      this.det.precio_total=this.form.value.hprecio_total;
      this.det.sub_total=this.form.value.hsub_total;
      this.det.pr.id_prenda=this.form.value.hpr;
      this.det.pe.id_pedido=this.form.value.hpe;
      
      if (this.edicion) {
        this.dS.update(this.det).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      } else {
      this.dS.insert(this.det).subscribe((data) => {
        this.dS.list().subscribe((d) => {
          this.dS.setList(d);
        });
      });
    }
      this.router.navigate(['det_pedido']);
    }
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id_det_pedido),
          hcantidad: new FormControl(data.cantidad),
          hprecio_total: new FormControl(data.precio_total),
          hsub_total: new FormControl(data.sub_total),
          hpr: new FormControl(data.pr),
          hpe: new FormControl(data.pe),
        });
      });
    }
  }
}
