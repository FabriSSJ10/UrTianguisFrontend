import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Tipoocasion } from '../models/Tipoocasion';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url= environment.base;

@Injectable({
  providedIn: 'root'
})
export class TipoocasionService {

  private url=`${base_url}/tipos_ocasion`;
  private listaCambio = new Subject<Tipoocasion[]>();
  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Tipoocasion[]>(this.url);
  }
  insert(tS: Tipoocasion) {
    return this.http.post(this.url, tS);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Tipoocasion[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Tipoocasion>(`${this.url}/${id}`);
  }

  update(tip: Tipoocasion) {
    return this.http.put(this.url, tip);
  }
}
