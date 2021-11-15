import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Mascota} from './mascota.model';

@model()
export class VisitaDomiciliaria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  visitaDomi_id?: string;

  @property({
    type: 'date',
    required: true,
  })
  visitaDomi_horaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  visitaDomi_horaFin: string;

  @property({
    type: 'number',
    required: true,
  })
  visitaDomi_edadMascota: number;

  @property({
    type: 'string',
    required: true,
  })
  visitaDomi_alimento: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<VisitaDomiciliaria>) {
    super(data);
  }
}

export interface VisitaDomiciliariaRelations {
  // describe navigational properties here
}

export type VisitaDomiciliariaWithRelations = VisitaDomiciliaria & VisitaDomiciliariaRelations;
