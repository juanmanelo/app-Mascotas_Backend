import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ConsultaVeterinaria, ConsultaVeterinariaRelations, Mascota, Proveedor} from '../models';
import {MascotaRepository} from './mascota.repository';
import {ProveedorRepository} from './proveedor.repository';

export class ConsultaVeterinariaRepository extends DefaultCrudRepository<
  ConsultaVeterinaria,
  typeof ConsultaVeterinaria.prototype.consVet_id,
  ConsultaVeterinariaRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof ConsultaVeterinaria.prototype.consVet_id>;

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof ConsultaVeterinaria.prototype.consVet_id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(ConsultaVeterinaria, dataSource);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
