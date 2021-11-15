import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PagosPlan,
  Plan,
} from '../models';
import {PagosPlanRepository} from '../repositories';

export class PagosPlanPlanController {
  constructor(
    @repository(PagosPlanRepository)
    public pagosPlanRepository: PagosPlanRepository,
  ) { }

  @get('/pagos-plans/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to PagosPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.string('id') id: typeof PagosPlan.prototype.pagPlan_id,
  ): Promise<Plan> {
    return this.pagosPlanRepository.plan(id);
  }
}
