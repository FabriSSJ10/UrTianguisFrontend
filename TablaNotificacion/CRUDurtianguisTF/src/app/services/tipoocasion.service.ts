import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo_ocasion } from '../models/Tipo_ocasion';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TipoocasionService {
  private urllist = `${base_url}/tipos_ocasion/listarTipos_ocasion`
  private urlinsert = `${base_url}/tipos_ocasion/registrarTipos_ocasion`
  private listaCambio=new Subject<Tipo_ocasion[]>()
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Tipo_ocasion[]>(this.urllist)
  }
  insert(to:Tipo_ocasion){
    return this.http.post(this.urlinsert,to)
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva:Tipo_ocasion[]){
    this.listaCambio.next(listaNueva)
  }
}
