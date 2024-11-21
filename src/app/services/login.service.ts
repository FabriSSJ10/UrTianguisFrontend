import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081'; 

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(request: JwtRequest) {
    return this.http.post(`${this.apiUrl}/login`, request);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, user); 
  }

  assignRole(role: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/roles`, role); 
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null; 
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }

  showUsername() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null; 
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.username;
  }
}
