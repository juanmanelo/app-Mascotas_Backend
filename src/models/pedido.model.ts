import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {DetallePedido} from './detalle-pedido.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  ped_id?: string;

  @property({
    type: 'date',
    required: true,
  })
  ped_fechaPedido: string;

  @property({
    type: 'date',
    required: true,
  })
  ped_fechaEntrega: string;

  @property({
    type: 'string',
    required: true,
  })
  ped_formaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  ped_pagado: string;

  @property({
    type: 'string',
    required: true,
  })
  ped_observacion: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => DetallePedido)
  detallePedidos: DetallePedido[];

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
