import AlreadyExistsError from '@shared/errors/AlreadyExistsError';
import ApiError from '@shared/errors/ApiError';
import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
	id: string;
	name?: string;
	email?: string;
	password?: string;
	avatar?: string;
}

class UpdateUserService {
	public async execute({
		id,
		name,
		email,
		password,
		avatar,
	}: IRequest): Promise<User> {
		if (!name && !email && !password && !avatar) {
			throw new ApiError('Preencher campos obrigatórios!');
		}
		const repository = getCustomRepository(UserRepository);
		const user = await repository.findOne(id);

		if (!user) {
			throw new NotFoundError('Usuário não encontrado!');
		}

		if (name) {
			user.name = name;
		}

		if (email) {
			const emailExists = await repository.findByEmail(email);

			if (emailExists && email !== user.email) {
				throw new AlreadyExistsError('Email já cadastrado!');
			}

			user.email = email;
		}

		if (password) {
			user.password;
		}

		if (avatar) {
			user.avatar = avatar;
		}

		await repository.save(user);

		return user;
	}
}

export default UpdateUserService;
