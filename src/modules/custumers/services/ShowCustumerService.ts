import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import Custumer from '../typeorm/entities/Custumer';
import CustumerRespository from '../typeorm/repositories/CustumerRepository';

class ShowCustumerService {
	public async execute(id: string): Promise<Custumer> {
		const repository = getCustomRepository(CustumerRespository);
		const custumer = await repository.findOne(id);

		if (!custumer) {
			throw new NotFoundError('Cliente não encontrado!');
		}
		return custumer;
	}
}

export default ShowCustumerService;
