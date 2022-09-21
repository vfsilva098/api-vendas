import { getCustomRepository } from 'typeorm';
import CustomerRespository from '../typeorm/repositories/CustomerRepository';
import ShowCustumerService from './ShowCustomerService';

class DeleteCustomerService {
	public async execute(id: string): Promise<void> {
		const showService = new ShowCustumerService();
		const repository = getCustomRepository(CustomerRespository);
		const custumer = await showService.execute(id);

		await repository.remove(custumer);
	}
}

export default DeleteCustomerService;
