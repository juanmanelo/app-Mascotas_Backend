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
  Plan,
  PagosPlan,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanPagosPlanController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/pagos-plans', {
    responses: {
      '200': {
        description: 'Array of Plan has many PagosPlan',
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
    return this.planRepository.pagosPlans(id).find(filter);
  }

  @post('/plans/{id}/pagos-plans', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagosPlan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.plan_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlan, {
            title: 'NewPagosPlanInPlan',
            exclude: ['pagPlan_id'],
            optional: ['planId']
          }),
        },
      },
    }) pagosPlan: Omit<PagosPlan, 'pagPlan_id'>,
  ): Promise<PagosPlan> {
    return this.planRepository.pagosPlans(id).create(pagosPlan);
  }

  @patch('/plans/{id}/pagos-plans', {
    responses: {
      '200': {
        description: 'Plan.PagosPlan PATCH success count',
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
    return this.planRepository.pagosPlans(id).patch(pagosPlan, where);
  }

  @del('/plans/{id}/pagos-plans', {
    responses: {
      '200': {
        description: 'Plan.PagosPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PagosPlan)) where?: Where<PagosPlan>,
  ): Promise<Count> {
    return this.planRepository.pagosPlans(id).delete(where);
  }
}
