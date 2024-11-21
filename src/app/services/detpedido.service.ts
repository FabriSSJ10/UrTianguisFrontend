import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Detpedido } from '../models/Detpedido';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Monto_total_recaudado_por_tipo_prendaDTO } from '../models/Monto_total_recaudado_por_tipo_prendaDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DetpedidoService {
  private url = `${base_url}/det_pedido`

  private listaCambio=new Subject<Detpedido[]>()
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Detpedido[]>(this.url)
  }
  insert(dp:Detpedido){
    return this.http.post(this.url,dp)
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva:Detpedido[]){
    this.listaCambio.next(listaNueva)
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number){
    return this.http.get<Detpedido>(`${this.url}/${id}`);
  }

  update(dp:Detpedido){
    return this.http.put(this.url, dp)
  }

  montototalxtipoprenda():Observable<Monto_total_recaudado_por_tipo_prendaDTO[]>{
    return this.http.get<Monto_total_recaudado_por_tipo_prendaDTO[]>(`${this.url}/TotalRecaudadoxPrenda`)
  }
}
