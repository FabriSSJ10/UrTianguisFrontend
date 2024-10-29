import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Tipo_pago } from '../../../models/Tipo_pago';
import { TipopagoService } from '../../../services/tipopago.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creareditartipopago',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './creareditartipopago.component.html',
  styleUrl: './creareditartipopago.component.css'
})
export class CreareditartipopagoComponent implements OnInit{
  form:FormGroup=new FormGroup({})
  tipopago:Tipo_pago=new Tipo_pago()

  constructor(private tP: TipopagoService, 
    private formBuilder:FormBuilder, private router:Router){}

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      htipopago:['',Validators.required]
    })
  }
  insertar():void{
    if(this.form.valid){
      this.tipopago.Tipo_pago=this.form.value.htipopago;
      this.tP.insert(this.tipopago).subscribe(data=>{
        this.tP.list().subscribe(data=>{
          this.tP.setList(data)
        })
      });
    }
    this.router.navigate(['tipopago'])
  }
}
