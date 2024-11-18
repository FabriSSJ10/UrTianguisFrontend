import { Outfit } from './Outfit';
import { Usuario } from './Usuario';

export class Comentariooutfit {
  id_comentario: number = 0;
  comentario: string = '';
  us: Usuario = new Usuario();
  ou: Outfit = new Outfit();
}
