import AlreadyExistsError from '@shared/errors/AlreadyExistsError';
import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRespository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
	id: string;
	name: string;
	email: string;
}

class UpdateCustomerService {
	public async execute({ id, name, email }: IRequest): Promise<Customer> {
		const repository = getCustomRepository(CustomerRespository);
		const customer = await repository.findOne(id);

		if (!customer) {
			throw new NotFoundError('Cliente não encontrado!');
		}

		const emailExists = await repository.findByEmail(email);

		if (emailExists && id !== emailExists.id) {
			throw new AlreadyExistsError('Um cliente já utiliza este email!');
		}

		customer.name = name;
		customer.email = email;

		await repository.save(customer);

		return customer;
	}
}

export default UpdateCustomerService;
