import { Departamento } from './Departamento';

export class Usuario {
  id_usuario: number = 0;
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  sexo: string = '';
  dni: string = '';
  password: string = '';
  fecha_Nacimiento: Date = new Date(Date.now());
  telefono: string = '';
  username: string = '';
  enabled: boolean = false;
  i_fecha_creacion: Date = new Date(Date.now());
  i_fecha_modificacion: Date = new Date(Date.now());
  i_creado_por: string = '';
  i_modificado_por: string = '';
  dp: Departamento = new Departamento();
}
