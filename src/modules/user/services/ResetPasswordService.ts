import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import { isAfter, addHours } from 'date-fns';
import ExpiredTokenError from '@shared/errors/ExpiredTokenError';
import { hash } from 'bcryptjs';

interface IRequest {
	token: string;
	password: string;
}

class ResetPasswordService {
	public async execute({ token, password }: IRequest): Promise<void> {
		const repository = getCustomRepository(UserRepository);
		const userTokenRepository = getCustomRepository(UserTokenRepository);
		const userToken = await userTokenRepository.findByToken(token);

		if (!userToken) {
			throw new NotFoundError('Token não existe!');
		}

		const user = await repository.findById(userToken.user_id);

		if (!user) {
			throw new NotFoundError('Usuário não encontrado!');
		}

		const tokenCreatedAt = userToken.created_at;
		const compareDate = addHours(tokenCreatedAt, 2);

		if (isAfter(Date.now(), compareDate)) {
			throw new ExpiredTokenError('Token expirado!');
		}

		user.password = await hash(password, 8);

		await repository.save(user);

		//TODO: Make send email
	}
}

export default ResetPasswordService;
