import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Tipopago } from '../models/Tipopago';
import { HttpClient } from '@angular/common/http';
const base_url= environment.base;

@Injectable({
  providedIn: 'root'
})
export class TipopagoService {
  private url=`${base_url}/tipos_pago`;
  private listarCambio= new Subject<Tipopago[]>();
  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Tipopago[]>(this.url);
  }
  insert(tp:Tipopago){
    return this.http.post(this.url,tp);
  }

  getList(){
    return this.listarCambio.asObservable();
  }

  setList(listaNueva:Tipopago[]){
    this.listarCambio.next(listaNueva);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number){
    return this.http.get<Tipopago>(`${this.url}/${id}`);
  }

  update(tip:Tipopago){
    return this.http.put(this.url,tip);
  }
}
