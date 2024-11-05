import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Notificacion } from '../models/Notificacion';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private url = `${base_url}/notificaciones`

  private listaCambio=new Subject<Notificacion[]>()
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Notificacion[]>(this.url)
  }
  insert(n:Notificacion){
    return this.http.post(this.url,n)
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva:Notificacion[]){
    this.listaCambio.next(listaNueva)
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number){
    return this.http.get<Notificacion>(`${this.url}/${id}`);
  }

  update(no:Notificacion){
    return this.http.put(this.url, no)
  }
}
