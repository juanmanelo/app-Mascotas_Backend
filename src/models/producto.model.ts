import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {DetallePedido} from './detalle-pedido.model';
import {Proveedor} from './proveedor.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  prod_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  prod_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  prod_descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  prod_presentacion: string;

  @property({
    type: 'number',
    required: true,
  })
  prod_precioRegular: number;

  @property({
    type: 'number',
    required: true,
  })
  prod_precioSist: number;

  @property({
    type: 'number',
    required: true,
  })
  prod_precioVenta: number;

  @hasMany(() => DetallePedido)
  detallePedidos: DetallePedido[];

  @belongsTo(() => Proveedor)
  proveedorId: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
