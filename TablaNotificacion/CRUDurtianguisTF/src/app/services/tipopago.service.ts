import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tipo_pago } from '../models/Tipo_pago';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TipopagoService {
  private urllist = `${base_url}/tipos_pago/listarTipos_pago`
  private urlinsert = `${base_url}/tipos_pago/registrarTipos_pago`
  private listaCambio=new Subject<Tipo_pago[]>()
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Tipo_pago[]>(this.urllist)
  }
  insert(tp:Tipo_pago){
    return this.http.post(this.urlinsert,tp)
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva:Tipo_pago[]){
    this.listaCambio.next(listaNueva)
  }
}
