import { Outfit } from './Outfit';

export class Catalogo {
  id_catalogo: number = 0;
  i_fecha_creacion: Date = new Date(Date.now());
  i_fecha_modificacion: Date = new Date(Date.now());
  ou: Outfit = new Outfit();
}
