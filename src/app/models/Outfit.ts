import { Prenda } from './Prenda';
import { Tipoocasion } from './Tipoocasion';
import { Usuario } from './Usuario';

export class Outfit {
  id_outfit: number = 0;
  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  i_fecha_creacion: Date = new Date(Date.now());
  i_fecha_modificacion: Date = new Date(Date.now());
  i_creador_por: string = '';
  i_modificado_por: string = '';
  us: Usuario = new Usuario();
  pr: Prenda = new Prenda();
  to: Tipoocasion = new Tipoocasion();
}
