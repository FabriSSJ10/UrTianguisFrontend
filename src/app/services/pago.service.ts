import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pago } from '../models/Pago';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Monto_total_pagos_por_departamentoDTO } from '../models/Monto_total_pagos_por_departamentoDTO';
import { Monto_total_pagos_por_sexoDTO } from '../models/Monto_total_pagos_por_sexoDTO';
import { Cantidad_pagos_por_tipo_pagoDTO } from '../models/Cantidad_pagos_por_tipo_pagoDTO';
import { Cantidad_pagos_por_tipo_pago_y_mesDTO } from '../models/Cantidad_pagos_por_tipo_pago_y_mesDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url = `${base_url}/pagos`

  private listaCambio=new Subject<Pago[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Pago[]>(this.url);
  }
  insert(c: Pago) {
    return this.http.post(this.url, c);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Pago[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Pago>(`${this.url}/${id}`);
  }

  update(cat: Pago) {
    return this.http.put(this.url, cat);
  }

  obtenerMontoTotalXDepartamento():Observable<Monto_total_pagos_por_departamentoDTO[]>{
    return this.http.get<Monto_total_pagos_por_departamentoDTO[]>(`${this.url}/sumByDepartment`)
  }

  obtenerMontoTotalXSexo():Observable<Monto_total_pagos_por_sexoDTO[]>{
    return this.http.get<Monto_total_pagos_por_sexoDTO[]>(`${this.url}/sumBySex`)
  }

  obtenerCantidadPagosXTipoPago():Observable<Cantidad_pagos_por_tipo_pagoDTO[]>{
    return this.http.get<Cantidad_pagos_por_tipo_pagoDTO[]>(`${this.url}/cantidad_pagoxtipo_pago`)
  }

  obtenerCantidadPagosXTipoPagoXMes():Observable<Cantidad_pagos_por_tipo_pago_y_mesDTO[]>{
    return this.http.get<Cantidad_pagos_por_tipo_pago_y_mesDTO[]>(`${this.url}/Pagos_Agrupadosxmesxmetodo`)
  }
}
