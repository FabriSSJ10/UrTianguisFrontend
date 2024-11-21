import { Notificacion } from './Notificacion';
import { Pago } from './Pago';
import { Usuario } from './Usuario';

export class Pedido {
  id_pedido: number = 0;
  estado_pedido: string = '';
  fecha_solicitud: Date = new Date(Date.now());
  fecha_entrega: Date = new Date(Date.now());
  i_fecha_creacion: Date = new Date(Date.now());
  i_creado_por: string = '';
  pa: Pago = new Pago();
  us: Usuario = new Usuario();
  no: Notificacion = new Notificacion();
}
