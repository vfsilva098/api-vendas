import { getCustomRepository } from 'typeorm';
import CustumerRespository from '../typeorm/repositories/CustumerRepository';
import ShowCustumerService from './ShowCustumerService';

class DeleteCustumerService {
	public async execute(id: string): Promise<void> {
		const showService = new ShowCustumerService();
		const repository = getCustomRepository(CustumerRespository);
		const custumer = await showService.execute(id);

		await repository.remove(custumer);
	}
}

export default DeleteCustumerService;
