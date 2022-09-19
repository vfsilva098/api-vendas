import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

class SendForgotPasswordEmailService {
	public async execute(email: string): Promise<void> {
		const repository = getCustomRepository(UserRepository);
		const userTokenRepository = getCustomRepository(UserTokenRepository);
		const user = await repository.findByEmail(email);

		if (!user) {
			throw new NotFoundError('Email não cadastrado!');
		}

		const token = await userTokenRepository.generate(user.id);

		console.log(token);
	}
}

export default SendForgotPasswordEmailService;
