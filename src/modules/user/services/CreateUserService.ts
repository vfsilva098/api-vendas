import AlreadyExistsError from '@shared/errors/AlreadyExistsError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	public async execute({ name, email, password }: IRequest): Promise<User> {
		const repository = getCustomRepository(UserRepository);
		const emailExists = await repository.findByEmail(email);

		if (emailExists) {
			throw new AlreadyExistsError('Email já cadastrado!');
		}

		const cryptPass = await hash(password, 8);

		const user = repository.create({ name, email, password: cryptPass });

		await repository.save(user);

		return user;
	}
}

export default CreateUserService;
