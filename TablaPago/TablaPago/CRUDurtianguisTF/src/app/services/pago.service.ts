import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pago } from '../models/Pago';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url = `${base_url}/pagos`

  private listaCambio=new Subject<Pago[]>()
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Pago[]>(this.url)
  }
  insert(p:Pago){
    return this.http.post(this.url,p)
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva:Pago[]){
    this.listaCambio.next(listaNueva)
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number){
    return this.http.get<Pago>(`${this.url}/${id}`);
  }

  update(p:Pago){
    return this.http.put(this.url, p)
  }
}
