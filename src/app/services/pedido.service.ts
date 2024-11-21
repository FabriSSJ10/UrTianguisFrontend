import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pedido } from '../models/Pedido';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Total_pedidos_por_mesDTO } from '../models/Total_pedidos_por_mesDTO';
import { Total_pedidos_por_departamentoDTO } from '../models/Total_pedidos_por_departamentoDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private url = `${base_url}/pedidos`

  private listaCambio=new Subject<Pedido[]>()
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Pedido[]>(this.url)
  }
  insert(p:Pedido){
    return this.http.post(this.url,p)
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva:Pedido[]){
    this.listaCambio.next(listaNueva)
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number){
    return this.http.get<Pedido>(`${this.url}/${id}`);
  }

  update(p:Pedido){
    return this.http.put(this.url, p)
  }

  obtenerCantidadPedidoXMes():Observable<Total_pedidos_por_mesDTO[]>{
    return this.http.get<Total_pedidos_por_mesDTO[]>(`${this.url}/TotalPedidoPorMes`)
  }

  obtenerCantidadPedidoXDepartamento():Observable<Total_pedidos_por_departamentoDTO[]>{
    return this.http.get<Total_pedidos_por_departamentoDTO[]>(`${this.url}/TotalPedidoPorDepartment`)
  }
}
