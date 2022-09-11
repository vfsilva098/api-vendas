import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class ShowUserService {
	public async execute(id: string): Promise<User> {
		const repository = getCustomRepository(UserRepository);
		const user = await repository.findOne(id);

		if (!user) {
			throw new NotFoundError('Usuário não encontrado!');
		}
		return user;
	}
}

export default ShowUserService;
