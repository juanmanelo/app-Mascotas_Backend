import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascota,
  VisitaDomiciliaria,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaVisitaDomiciliariaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Array of Mascota has many VisitaDomiciliaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VisitaDomiciliaria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VisitaDomiciliaria>,
  ): Promise<VisitaDomiciliaria[]> {
    return this.mascotaRepository.visitaDomiciliarias(id).find(filter);
  }

  @post('/mascotas/{id}/visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitaDomiciliaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.masc_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDomiciliaria, {
            title: 'NewVisitaDomiciliariaInMascota',
            exclude: ['visitaDomi_id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) visitaDomiciliaria: Omit<VisitaDomiciliaria, 'visitaDomi_id'>,
  ): Promise<VisitaDomiciliaria> {
    return this.mascotaRepository.visitaDomiciliarias(id).create(visitaDomiciliaria);
  }

  @patch('/mascotas/{id}/visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Mascota.VisitaDomiciliaria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDomiciliaria, {partial: true}),
        },
      },
    })
    visitaDomiciliaria: Partial<VisitaDomiciliaria>,
    @param.query.object('where', getWhereSchemaFor(VisitaDomiciliaria)) where?: Where<VisitaDomiciliaria>,
  ): Promise<Count> {
    return this.mascotaRepository.visitaDomiciliarias(id).patch(visitaDomiciliaria, where);
  }

  @del('/mascotas/{id}/visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Mascota.VisitaDomiciliaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitaDomiciliaria)) where?: Where<VisitaDomiciliaria>,
  ): Promise<Count> {
    return this.mascotaRepository.visitaDomiciliarias(id).delete(where);
  }
}
