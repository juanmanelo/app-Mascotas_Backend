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
  Empleado,
} from '../models';
import {VisitaDomiciliariaRepository} from '../repositories';

export class VisitaDomiciliariaEmpleadoController {
  constructor(
    @repository(VisitaDomiciliariaRepository)
    public visitaDomiciliariaRepository: VisitaDomiciliariaRepository,
  ) { }

  @get('/visita-domiciliarias/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to VisitaDomiciliaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof VisitaDomiciliaria.prototype.visitaDomi_id,
  ): Promise<Empleado> {
    return this.visitaDomiciliariaRepository.empleado(id);
  }
}
