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
  PagosPlan,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPagosPlanController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/pagos-plans', {
    responses: {
      '200': {
        description: 'Array of Mascota has many PagosPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PagosPlan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PagosPlan>,
  ): Promise<PagosPlan[]> {
    return this.mascotaRepository.pagosPlans(id).find(filter);
  }

  @post('/mascotas/{id}/pagos-plans', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagosPlan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.masc_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlan, {
            title: 'NewPagosPlanInMascota',
            exclude: ['pagPlan_id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) pagosPlan: Omit<PagosPlan, 'pagPlan_id'>,
  ): Promise<PagosPlan> {
    return this.mascotaRepository.pagosPlans(id).create(pagosPlan);
  }

  @patch('/mascotas/{id}/pagos-plans', {
    responses: {
      '200': {
        description: 'Mascota.PagosPlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlan, {partial: true}),
        },
      },
    })
    pagosPlan: Partial<PagosPlan>,
    @param.query.object('where', getWhereSchemaFor(PagosPlan)) where?: Where<PagosPlan>,
  ): Promise<Count> {
    return this.mascotaRepository.pagosPlans(id).patch(pagosPlan, where);
  }

  @del('/mascotas/{id}/pagos-plans', {
    responses: {
      '200': {
        description: 'Mascota.PagosPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PagosPlan)) where?: Where<PagosPlan>,
  ): Promise<Count> {
    return this.mascotaRepository.pagosPlans(id).delete(where);
  }
}
