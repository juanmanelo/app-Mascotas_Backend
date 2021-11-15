import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, PagosPlan} from '../models';
import {PagosPlanRepository} from './pagos-plan.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.plan_id,
  PlanRelations
> {

  public readonly pagosPlans: HasManyRepositoryFactory<PagosPlan, typeof Plan.prototype.plan_id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PagosPlanRepository') protected pagosPlanRepositoryGetter: Getter<PagosPlanRepository>,
  ) {
    super(Plan, dataSource);
    this.pagosPlans = this.createHasManyRepositoryFactoryFor('pagosPlans', pagosPlanRepositoryGetter,);
    this.registerInclusionResolver('pagosPlans', this.pagosPlans.inclusionResolver);
  }
}
