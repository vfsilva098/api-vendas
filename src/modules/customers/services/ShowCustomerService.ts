import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRespository from '../typeorm/repositories/CustomerRepository';

class ShowCustomerService {
	public async execute(id: string): Promise<Customer> {
		const repository = getCustomRepository(CustomerRespository);
		const custumer = await repository.findOne(id);

		if (!custumer) {
			throw new NotFoundError('Cliente não encontrado!');
		}
		return custumer;
	}
}

export default ShowCustomerService;
