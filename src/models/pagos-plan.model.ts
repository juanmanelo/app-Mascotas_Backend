import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plan} from './plan.model';
import {Mascota} from './mascota.model';

@model()
export class PagosPlan extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  pagPlan_id?: string;

  @property({
    type: 'number',
    required: true,
  })
  pagPlan_cant: number;

  @property({
    type: 'date',
    required: true,
  })
  pagPlan_fechaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  pagPlan_formaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  pagPlan_observacion: string;

  @belongsTo(() => Plan)
  planId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<PagosPlan>) {
    super(data);
  }
}

export interface PagosPlanRelations {
  // describe navigational properties here
}

export type PagosPlanWithRelations = PagosPlan & PagosPlanRelations;
