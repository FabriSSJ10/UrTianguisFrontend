import { Tipopago } from './Tipopago';

export class Pago {
  id_pago: number = 0;
  monto: number = 0;
  fecha_pago: Date = new Date(Date.now());
  fecha_vencimiento: string = '';
  cod_validacion: string = '';
  num_tarjeta_cliente: string = '';
  telefono_cliente: string = '';
  tp: Tipopago = new Tipopago();
}
