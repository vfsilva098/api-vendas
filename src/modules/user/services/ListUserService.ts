import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class ListUserService {
	public async execute(): Promise<User[]> {
		const repository = getCustomRepository(UserRepository);

		return await repository.find();
	}
}

export default ListUserService;
