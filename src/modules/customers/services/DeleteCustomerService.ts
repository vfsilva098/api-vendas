import { getCustomRepository } from 'typeorm';
import CustomerRespository from '../typeorm/repositories/CustomerRepository';
import ShowCustomerService from './ShowCustomerService';

class DeleteCustomerService {
	public async execute(id: string): Promise<void> {
		const showService = new ShowCustomerService();
		const repository = getCustomRepository(CustomerRespository);
		const customer = await showService.execute(id);

		await repository.remove(customer);
	}
}

export default DeleteCustomerService;
