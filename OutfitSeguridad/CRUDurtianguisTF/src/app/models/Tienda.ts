import { Usuario } from './Usuario';

export class Tienda {
  id_tienda: number = 0;
  nombre: string = '';
  altitud: number = 0;
  latitud: number = 0;
  logo: string = '';
  us: Usuario = new Usuario();
}
