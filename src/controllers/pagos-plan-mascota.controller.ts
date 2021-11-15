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
  Mascota,
} from '../models';
import {PagosPlanRepository} from '../repositories';

export class PagosPlanMascotaController {
  constructor(
    @repository(PagosPlanRepository)
    public pagosPlanRepository: PagosPlanRepository,
  ) { }

  @get('/pagos-plans/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to PagosPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof PagosPlan.prototype.pagPlan_id,
  ): Promise<Mascota> {
    return this.pagosPlanRepository.mascota(id);
  }
}
