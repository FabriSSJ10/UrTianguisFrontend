import { Tienda } from "./Tienda"
import { Tipo_prenda } from "./Tipoprenda"

export class Prenda{
    id_prenda:number=0
    nombre:string=""
    descripcion:string=""
    precio:number=0
    talla:string=""
    stock:number=0
    veces_usada:number=0
    imagen:string=""
    i_fecha_creacion:Date=new Date(Date.now())
    i_fecha_modificacion:Date=new Date(Date.now())
    i_creado_por:string=""
    i_modificado_por:string=""
    tp:Tipo_prenda=new Tipo_prenda()
    ti:Tienda=new Tienda()
}