import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NotificacionService } from '../../../services/notificacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Notificacion } from '../../../models/Notificacion';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creareditarnotificacion',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, 
    FormsModule, MatSelectModule, 
    MatButtonModule, ReactiveFormsModule, 
    MatSelectModule, CommonModule],
  templateUrl: './creareditarnotificacion.component.html',
  styleUrl: './creareditarnotificacion.component.css'
})
export class CreareditarnotificacionComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  notificacion:Notificacion=new Notificacion();

  id:number=0
  edicion:boolean=false

  constructor(
    private n: NotificacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null

      this.init()
    })
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hdescripcion: ['', Validators.required],
    });
  }
  insertar():void{
    if(this.form.valid){
      this.notificacion.id_notificacion=this.form.value.hcodigo;
      this.notificacion.descripcion=this.form.value.hdescripcion;
      if (this.edicion){
        this.n.update(this.notificacion).subscribe(data=>{
          this.n.list().subscribe(data=>{
            this.n.setList(data)
          })
        });
      }else{
        this.n.insert(this.notificacion).subscribe(data=>{
          this.n.list().subscribe(data=>{
            this.n.setList(data)
          })
        });
      }   
    }
    this.router.navigate(['notificaciones'])
  }

  init() {
    if(this.edicion){
      this.n.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.id_notificacion),
          hdescripcion:new FormControl(data.descripcion),
          })
      })
    }
  }
}
