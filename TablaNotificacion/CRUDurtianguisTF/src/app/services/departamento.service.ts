import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from '../models/Departamento';
import { environment } from '../../environments/environment';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private url = `${base_url}/departamentos`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Departamento[]>(this.url)
  }
}
