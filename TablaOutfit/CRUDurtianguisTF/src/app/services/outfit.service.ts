import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Outfit } from '../models/Outfit';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  private url = `${base_url}/outfits`;
  private listaCambio = new Subject<Outfit[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Outfit[]>(this.url);
  }
  insert(o: Outfit) {
    return this.http.post(this.url, o);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Outfit[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Outfit>(`${this.url}/${id}`);
  }

  update(out: Outfit) {
    return this.http.put(this.url, out);
  }
}
