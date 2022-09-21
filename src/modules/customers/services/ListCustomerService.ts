import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRespository from '../typeorm/repositories/CustomerRepository';

class ListCustomerService {
	public async execute(): Promise<Customer[]> {
		const repository = getCustomRepository(CustomerRespository);

		return await repository.find();
	}
}

export default ListCustomerService;
