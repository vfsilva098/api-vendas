import { getCustomRepository } from 'typeorm';
import Custumer from '../typeorm/entities/Custumer';
import CustumerRespository from '../typeorm/repositories/CustumerRepository';

class ListCustumerService {
	public async execute(): Promise<Custumer[]> {
		const repository = getCustomRepository(CustumerRespository);

		return await repository.find();
	}
}

export default ListCustumerService;
