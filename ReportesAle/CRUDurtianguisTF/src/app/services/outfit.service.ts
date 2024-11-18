import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Outfit } from '../models/Outfit';
import { HttpClient } from '@angular/common/http';
import { Cantidad_outfits_por_prendaDTO } from '../models/Cantidad_outfits_por_prendaDTO';

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

  cantOutfirxPrenda():Observable<Cantidad_outfits_por_prendaDTO[]>{
    return this.http.get<Cantidad_outfits_por_prendaDTO[]>(`${this.url}/cantidadesOutfitXPrenda`)
  }
}
