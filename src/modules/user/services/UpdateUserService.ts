import AlreadyExistsError from '@shared/errors/AlreadyExistsError';
import ApiError from '@shared/errors/ApiError';
import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import { compare, hash } from 'bcryptjs';
interface IRequest {
	id: string;
	name: string;
	email: string;
	password?: string;
	old_password?: string;
}

class UpdateUserService {
	public async execute({
		id,
		name,
		email,
		password,
		old_password,
	}: IRequest): Promise<User> {
		const repository = getCustomRepository(UserRepository);
		const user = await repository.findOne(id);

		if (!user) {
			throw new NotFoundError('Usuário não encontrado!');
		}

		const emailExists = await repository.findByEmail(email);

		if (emailExists && id !== user.id) {
			throw new AlreadyExistsError('Email já cadastrado!');
		}

		if (password && !old_password) {
			throw new ApiError('Senha atual é obrigatória!');
		}

		if (password && old_password) {
			const checkPassword = await compare(old_password, user.password);

			if (!checkPassword) {
				throw new ApiError('Senha atual incorreta!');
			}

			user.password = await hash(password, 8);
		}

		user.name = name;
		user.email = email;

		await repository.save(user);

		return user;
	}
}

export default UpdateUserService;
