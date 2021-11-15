import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Mascota, VisitaDomiciliaria} from '../models';
import {MascotaRepository} from './mascota.repository';
import {VisitaDomiciliariaRepository} from './visita-domiciliaria.repository';


export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.emp_id,
  EmpleadoRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Empleado.prototype.emp_id>;

  public readonly visitaDomiciliarias: HasManyRepositoryFactory<VisitaDomiciliaria, typeof Empleado.prototype.emp_id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Empleado.prototype.emp_id>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empleado.prototype.emp_id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('VisitaDomiciliariaRepository') protected visitaDomiciliariaRepositoryGetter: Getter<VisitaDomiciliariaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Empleado, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.visitaDomiciliarias = this.createHasManyRepositoryFactoryFor('visitaDomiciliarias', visitaDomiciliariaRepositoryGetter,);
    this.registerInclusionResolver('visitaDomiciliarias', this.visitaDomiciliarias.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
