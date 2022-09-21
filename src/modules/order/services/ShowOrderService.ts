import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrderRepository } from '../typeorm/repositories/OrderRepository';

interface IRequest {
	id: string;
}
class ShowOrderService {
	public async execute({ id }: IRequest): Promise<Order> {
		const repository = getCustomRepository(OrderRepository);
		const order = await repository.findById(id);

		if (!order) {
			throw new NotFoundError('Pedido de compra não encontrado');
		}

		return order;
	}
}

export default ShowOrderService;
