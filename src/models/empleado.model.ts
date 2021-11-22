import {Entity, hasMany, model, property} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {VisitaDomiciliaria} from './visita-domiciliaria.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  emp_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  emp_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  emp_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  emp_fechaIngreso: string;

  @property({
    type: 'string',
    required: true,
  })
  emp_cargo: string;

  @property({
    type: 'string',
    required: true,
  })
  emp_departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  emp_correo: string;

  @property({
    type: 'string',
    required: false,
  })
  emp_clave: string;

  @property({
    type: 'string',
    required: true,
  })
  emp_celular: string;

  @property({
    type: 'string',
    required: true,
  })
  emp_comision: string;

  @property({
    type: 'string',
    required: true,
  })
  emp_nivel: string;

  @property({
    type: 'string',
    required: true,
  })
  emp_foto: string;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @hasMany(() => VisitaDomiciliaria)
  visitaDomiciliarias: VisitaDomiciliaria[];


  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
