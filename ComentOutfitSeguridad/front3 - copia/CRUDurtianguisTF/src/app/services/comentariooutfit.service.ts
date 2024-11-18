import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Comentariooutfit } from '../models/Comentariooutfit';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ComentariooutfitService {
  private url = `${base_url}/comentarios_outfit`;
  private listaCout = new Subject<Comentariooutfit[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Comentariooutfit[]>(this.url);
  }
  insert(co: Comentariooutfit) {
    return this.http.post(this.url, co);
  }

  getList() {
    return this.listaCout.asObservable();
  }

  setList(listaNueva: Comentariooutfit[]) {
    this.listaCout.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Comentariooutfit>(`${this.url}/${id}`);
  }

  update(cout: Comentariooutfit) {
    return this.http.put(this.url, cout);
  }
}
