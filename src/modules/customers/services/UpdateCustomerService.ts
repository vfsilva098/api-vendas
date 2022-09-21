import AlreadyExistsError from '@shared/errors/AlreadyExistsError';
import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustumerRespository from '../typeorm/repositories/CustumerRepository';

interface IRequest {
	id: string;
	name: string;
	email: string;
}

class UpdateCustomerService {
	public async execute({ id, name, email }: IRequest): Promise<Customer> {
		const repository = getCustomRepository(CustumerRespository);
		const custumer = await repository.findOne(id);

		if (!custumer) {
			throw new NotFoundError('Cliente não encontrado!');
		}

		const emailExists = await repository.findByEmail(email);

		if (emailExists && id !== emailExists.id) {
			throw new AlreadyExistsError('Um cliente já utiliza este email!');
		}

		custumer.name = name;
		custumer.email = email;

		await repository.save(custumer);

		return custumer;
	}
}

export default UpdateCustomerService;
