import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tipo_ocasion } from '../../../models/Tipo_ocasion';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { TipoocasionService } from '../../../services/tipoocasion.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creareditartipoocasion',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatInputModule, 
    MatFormFieldModule, FormsModule, MatSelectModule],
  templateUrl: './creareditartipoocasion.component.html',
  styleUrl: './creareditartipoocasion.component.css'
})
export class CreareditartipoocasionComponent implements OnInit {
  form:FormGroup=new FormGroup({})
  tipoocasion:Tipo_ocasion=new Tipo_ocasion()

  constructor(private tS: TipoocasionService, 
    private formBuilder:FormBuilder, private router:Router){}

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      htipoocasion:['',Validators.required]
    })
  }
  insertar():void{
    if(this.form.valid){
      this.tipoocasion.Tipo_ocasion=this.form.value.htipoocasion;
      this.tS.insert(this.tipoocasion).subscribe(data=>{
        this.tS.list().subscribe(data=>{
          this.tS.setList(data)
        })
      });
    }
    this.router.navigate(['tipoocasion'])
  }
}
