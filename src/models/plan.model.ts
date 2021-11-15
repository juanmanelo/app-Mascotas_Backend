import {Entity, model, property, hasMany} from '@loopback/repository';
import {PagosPlan} from './pagos-plan.model';

@model()
export class Plan extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  plan_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  plan_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  plan_descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  plan_precio: number;

  @hasMany(() => PagosPlan)
  pagosPlans: PagosPlan[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
