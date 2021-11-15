import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Proveedor} from './proveedor.model';

@model()
export class ConsultaVeterinaria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  consVet_id?: string;

  @property({
    type: 'date',
    required: true,
  })
  consVet_fechaSolicitud: string;

  @property({
    type: 'date',
    required: true,
  })
  consVet_fechaConsulta: string;

  @property({
    type: 'string',
    required: true,
  })
  consVet_pagado: string;

  @property({
    type: 'string',
    required: true,
  })
  consVet_observacion: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  constructor(data?: Partial<ConsultaVeterinaria>) {
    super(data);
  }
}

export interface ConsultaVeterinariaRelations {
  // describe navigational properties here
}

export type ConsultaVeterinariaWithRelations = ConsultaVeterinaria & ConsultaVeterinariaRelations;
