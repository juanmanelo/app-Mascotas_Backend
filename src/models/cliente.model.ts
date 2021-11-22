import {Entity, hasMany, model, property} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Pedido} from './pedido.model';

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
    required: false,
  })
  clien_clave: string;

  @property({
    type: 'string',
    required: true,
  })
  clien_celular: string;


  @property({
    type: 'string',
    required: true,
  })
  clien_telf: string;

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
