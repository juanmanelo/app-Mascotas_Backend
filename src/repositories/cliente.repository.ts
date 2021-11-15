import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Pedido, Mascota} from '../models';
import {PedidoRepository} from './pedido.repository';
import {MascotaRepository} from './mascota.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.clien_id,
  ClienteRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.clien_id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.clien_id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Cliente, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
