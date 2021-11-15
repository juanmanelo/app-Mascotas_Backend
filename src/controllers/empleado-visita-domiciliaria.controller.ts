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
  Empleado,
  VisitaDomiciliaria,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoVisitaDomiciliariaController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Array of Empleado has many VisitaDomiciliaria',
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
    return this.empleadoRepository.visitaDomiciliarias(id).find(filter);
  }

  @post('/empleados/{id}/visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitaDomiciliaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.emp_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDomiciliaria, {
            title: 'NewVisitaDomiciliariaInEmpleado',
            exclude: ['visitaDomi_id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) visitaDomiciliaria: Omit<VisitaDomiciliaria, 'visitaDomi_id'>,
  ): Promise<VisitaDomiciliaria> {
    return this.empleadoRepository.visitaDomiciliarias(id).create(visitaDomiciliaria);
  }

  @patch('/empleados/{id}/visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Empleado.VisitaDomiciliaria PATCH success count',
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
    return this.empleadoRepository.visitaDomiciliarias(id).patch(visitaDomiciliaria, where);
  }

  @del('/empleados/{id}/visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Empleado.VisitaDomiciliaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitaDomiciliaria)) where?: Where<VisitaDomiciliaria>,
  ): Promise<Count> {
    return this.empleadoRepository.visitaDomiciliarias(id).delete(where);
  }
}
