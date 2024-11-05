import { Injectable } from '@angular/core';
import { Prenda } from '../models/Prenda';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
}
