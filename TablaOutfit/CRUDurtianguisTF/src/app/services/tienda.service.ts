import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Tienda } from '../models/Tienda';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private url = `${base_url}/tiendas`;
  private listaTienda = new Subject<Tienda[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Tienda[]>(this.url);
  }
  insert(u: Tienda) {
    return this.http.post(this.url, u);
  }

  getList() {
    return this.listaTienda.asObservable();
  }

  setList(listaNueva: Tienda[]) {
    this.listaTienda.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Tienda>(`${this.url}/${id}`);
  }

  update(usu: Tienda) {
    return this.http.put(this.url, usu);
  }
}
