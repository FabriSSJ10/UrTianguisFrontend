import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Catalogo } from '../models/Catalogo';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private url = `${base_url}/catalogos`;
  private listaCatalogo = new Subject<Catalogo[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Catalogo[]>(this.url);
  }
  insert(c: Catalogo) {
    return this.http.post(this.url, c);
  }

  getList() {
    return this.listaCatalogo.asObservable();
  }

  setList(listaNueva: Catalogo[]) {
    this.listaCatalogo.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Catalogo>(`${this.url}/${id}`);
  }

  update(cat: Catalogo) {
    return this.http.put(this.url, cat);
  }
}
