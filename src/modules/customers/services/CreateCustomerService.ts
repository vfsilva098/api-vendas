import AlreadyExistsError from '@shared/errors/AlreadyExistsError';
import { getCustomRepository } from 'typeorm';
import Custumer from '../typeorm/entities/Custumer';
import CustumerRespository from '../typeorm/repositories/CustumerRepository';

interface IRequest {
	name: string;
	email: string;
}

class CreateCustomerService {
	public async execute({ name, email }: IRequest): Promise<Custumer> {
		const repository = getCustomRepository(CustumerRespository);
		const emailExists = await repository.findByEmail(email);

		if (emailExists) {
			throw new AlreadyExistsError('Email já cadastrado!');
		}

		const user = repository.create({ name, email });

		await repository.save(user);

		return user;
	}
}

export default CreateCustomerService;
