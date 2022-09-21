import AlreadyExistsError from '@shared/errors/AlreadyExistsError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRespository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
	name: string;
	email: string;
}

class CreateCustomerService {
	public async execute({ name, email }: IRequest): Promise<Customer> {
		const repository = getCustomRepository(CustomerRespository);
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
