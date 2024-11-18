import { Injectable } from '@angular/core';
import { Prenda } from '../models/Prenda';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cantidad_prendas_por_tiendaDTO } from '../models/Cantidad_prendas_por_tiendaDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class PrendaService {
  private url = `${base_url}/prendas`

  private listaCambio=new Subject<Prenda[]>()
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Prenda[]>(this.url)
  }
  insert(p:Prenda){
    return this.http.post(this.url,p)
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva:Prenda[]){
    this.listaCambio.next(listaNueva)
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number){
    return this.http.get<Prenda>(`${this.url}/${id}`);
  }

  update(p:Prenda){
    return this.http.put(this.url, p)
  }

  cantprendaxtienda():Observable<Cantidad_prendas_por_tiendaDTO[]>{
    return this.http.get<Cantidad_prendas_por_tiendaDTO[]>(`${this.url}/cantidad_prendasxtienda`)
  }
}
