import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {PagosPlan} from './pagos-plan.model';
import {Cliente} from './cliente.model';
import {ConsultaVeterinaria} from './consulta-veterinaria.model';
import {Empleado} from './empleado.model';
import {VisitaDomiciliaria} from './visita-domiciliaria.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  masc_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_especie: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_raza: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_color: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_genero: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_peso: string;

  @property({
    type: 'date',
    required: true,
  })
  masc_fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_activo: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_rescindido: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_motivoInactivo: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_enfermedades: string;

  @property({
    type: 'string',
    required: true,
  })
  masc_foto: string;

  @hasMany(() => PagosPlan)
  pagosPlans: PagosPlan[];

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => ConsultaVeterinaria)
  consultaVeterinarias: ConsultaVeterinaria[];

  @belongsTo(() => Empleado)
  empleadoId: string;

  @hasMany(() => VisitaDomiciliaria)
  visitaDomiciliarias: VisitaDomiciliaria[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
