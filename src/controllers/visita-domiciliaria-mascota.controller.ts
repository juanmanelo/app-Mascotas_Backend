import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VisitaDomiciliaria,
  Mascota,
} from '../models';
import {VisitaDomiciliariaRepository} from '../repositories';

export class VisitaDomiciliariaMascotaController {
  constructor(
    @repository(VisitaDomiciliariaRepository)
    public visitaDomiciliariaRepository: VisitaDomiciliariaRepository,
  ) { }

  @get('/visita-domiciliarias/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to VisitaDomiciliaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof VisitaDomiciliaria.prototype.visitaDomi_id,
  ): Promise<Mascota> {
    return this.visitaDomiciliariaRepository.mascota(id);
  }
}
