import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {VisitaDomiciliaria} from '../models';
import {VisitaDomiciliariaRepository} from '../repositories';

export class VisitaDomiciliariaController {
  constructor(
    @repository(VisitaDomiciliariaRepository)
    public visitaDomiciliariaRepository: VisitaDomiciliariaRepository,
  ) { }

  @post('/visita-domiciliarias')
  @response(200, {
    description: 'VisitaDomiciliaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(VisitaDomiciliaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDomiciliaria, {
            title: 'NewVisitaDomiciliaria',
            exclude: ['visitaDomi_id'],
          }),
        },
      },
    })
    visitaDomiciliaria: Omit<VisitaDomiciliaria, 'id'>,
  ): Promise<VisitaDomiciliaria> {
    return this.visitaDomiciliariaRepository.create(visitaDomiciliaria);
  }

  @get('/visita-domiciliarias/count')
  @response(200, {
    description: 'VisitaDomiciliaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VisitaDomiciliaria) where?: Where<VisitaDomiciliaria>,
  ): Promise<Count> {
    return this.visitaDomiciliariaRepository.count(where);
  }

  @get('/visita-domiciliarias')
  @response(200, {
    description: 'Array of VisitaDomiciliaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VisitaDomiciliaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VisitaDomiciliaria) filter?: Filter<VisitaDomiciliaria>,
  ): Promise<VisitaDomiciliaria[]> {
    return this.visitaDomiciliariaRepository.find(filter);
  }

  @patch('/visita-domiciliarias')
  @response(200, {
    description: 'VisitaDomiciliaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDomiciliaria, {partial: true}),
        },
      },
    })
    visitaDomiciliaria: VisitaDomiciliaria,
    @param.where(VisitaDomiciliaria) where?: Where<VisitaDomiciliaria>,
  ): Promise<Count> {
    return this.visitaDomiciliariaRepository.updateAll(visitaDomiciliaria, where);
  }

  @get('/visita-domiciliarias/{id}')
  @response(200, {
    description: 'VisitaDomiciliaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VisitaDomiciliaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VisitaDomiciliaria, {exclude: 'where'}) filter?: FilterExcludingWhere<VisitaDomiciliaria>
  ): Promise<VisitaDomiciliaria> {
    return this.visitaDomiciliariaRepository.findById(id, filter);
  }

  @patch('/visita-domiciliarias/{id}')
  @response(204, {
    description: 'VisitaDomiciliaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDomiciliaria, {partial: true}),
        },
      },
    })
    visitaDomiciliaria: VisitaDomiciliaria,
  ): Promise<void> {
    await this.visitaDomiciliariaRepository.updateById(id, visitaDomiciliaria);
  }

  @put('/visita-domiciliarias/{id}')
  @response(204, {
    description: 'VisitaDomiciliaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitaDomiciliaria: VisitaDomiciliaria,
  ): Promise<void> {
    await this.visitaDomiciliariaRepository.replaceById(id, visitaDomiciliaria);
  }

  @del('/visita-domiciliarias/{id}')
  @response(204, {
    description: 'VisitaDomiciliaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitaDomiciliariaRepository.deleteById(id);
  }
}
