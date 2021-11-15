import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {Mascota} from './mascota.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  clien_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  clien_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  clien_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  clien_genero: string;

  @property({
    type: 'string',
    required: true,
  })
  clien_direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  clien_ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  clien_correo: string;

  @property({
    type: 'string',
    required: true,
  })
  clien_telf1: string;

  @property({
    type: 'string',
    required: true,
  })
  clien_telf2: string;

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
