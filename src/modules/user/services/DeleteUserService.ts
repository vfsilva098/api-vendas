import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import ShowUserService from './ShowUserService';

class DeleteUserService {
	public async execute(id: string): Promise<void> {
		const showService = new ShowUserService();
		const repository = getCustomRepository(UserRepository);
		const user = await showService.execute(id);

		await repository.remove(user);
	}
}

export default DeleteUserService;
