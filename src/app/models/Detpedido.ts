import { Pedido } from "./Pedido"
import { Prenda } from "./Prenda"

export class Detpedido{
    id_det_pedido:number=0
    cantidad:number=0
    precio_total:number=0
    sub_total:number=0
    pr:Prenda=new Prenda()
    pe:Pedido=new Pedido()
}