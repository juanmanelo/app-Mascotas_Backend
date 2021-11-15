import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PagosPlan, PagosPlanRelations, Plan, Mascota} from '../models';
import {PlanRepository} from './plan.repository';
import {MascotaRepository} from './mascota.repository';

export class PagosPlanRepository extends DefaultCrudRepository<
  PagosPlan,
  typeof PagosPlan.prototype.pagPlan_id,
  PagosPlanRelations
> {

  public readonly plan: BelongsToAccessor<Plan, typeof PagosPlan.prototype.pagPlan_id>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof PagosPlan.prototype.pagPlan_id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(PagosPlan, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}
