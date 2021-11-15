import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, PagosPlan, Cliente, ConsultaVeterinaria, Empleado, VisitaDomiciliaria} from '../models';
import {PagosPlanRepository} from './pagos-plan.repository';
import {ClienteRepository} from './cliente.repository';
import {ConsultaVeterinariaRepository} from './consulta-veterinaria.repository';
import {EmpleadoRepository} from './empleado.repository';
import {VisitaDomiciliariaRepository} from './visita-domiciliaria.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.masc_id,
  MascotaRelations
> {

  public readonly pagosPlans: HasManyRepositoryFactory<PagosPlan, typeof Mascota.prototype.masc_id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.masc_id>;

  public readonly consultaVeterinarias: HasManyRepositoryFactory<ConsultaVeterinaria, typeof Mascota.prototype.masc_id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Mascota.prototype.masc_id>;

  public readonly visitaDomiciliarias: HasManyRepositoryFactory<VisitaDomiciliaria, typeof Mascota.prototype.masc_id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PagosPlanRepository') protected pagosPlanRepositoryGetter: Getter<PagosPlanRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConsultaVeterinariaRepository') protected consultaVeterinariaRepositoryGetter: Getter<ConsultaVeterinariaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('VisitaDomiciliariaRepository') protected visitaDomiciliariaRepositoryGetter: Getter<VisitaDomiciliariaRepository>,
  ) {
    super(Mascota, dataSource);
    this.visitaDomiciliarias = this.createHasManyRepositoryFactoryFor('visitaDomiciliarias', visitaDomiciliariaRepositoryGetter,);
    this.registerInclusionResolver('visitaDomiciliarias', this.visitaDomiciliarias.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.consultaVeterinarias = this.createHasManyRepositoryFactoryFor('consultaVeterinarias', consultaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('consultaVeterinarias', this.consultaVeterinarias.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.pagosPlans = this.createHasManyRepositoryFactoryFor('pagosPlans', pagosPlanRepositoryGetter,);
    this.registerInclusionResolver('pagosPlans', this.pagosPlans.inclusionResolver);
  }
}
