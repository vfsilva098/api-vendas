import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustumerRespository from '../typeorm/repositories/CustumerRepository';

class ListCustomerService {
	public async execute(): Promise<Customer[]> {
		const repository = getCustomRepository(CustumerRespository);

		return await repository.find();
	}
}

export default ListCustomerService;
