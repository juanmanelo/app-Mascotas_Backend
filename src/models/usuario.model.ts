import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  usu_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  usu_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  usu_apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  usu_correo: string;

  @property({
    type: 'string',
    required: true,
  })
  usu_clave: string;

  @property({
    type: 'string',
    required: true,
  })
  usu_rol: string;

  @property({
    type: 'string',
    required: true,
  })
  usu_nivelPermiso: string;


  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
