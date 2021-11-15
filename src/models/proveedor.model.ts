import {Entity, model, property, hasMany} from '@loopback/repository';
import {ConsultaVeterinaria} from './consulta-veterinaria.model';

@model()
export class Proveedor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  prov_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  prov_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  prov_contacto: string;

  @property({
    type: 'string',
    required: true,
  })
  prov_telf1: string;

  @property({
    type: 'string',
    required: true,
  })
  prov_telf2: string;

  @property({
    type: 'string',
    required: true,
  })
  prov_direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  prov_ciudad: string;

  @hasMany(() => ConsultaVeterinaria)
  consultaVeterinarias: ConsultaVeterinaria[];

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
