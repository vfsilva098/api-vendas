import { AUTH_CONFIG } from '@config/auth';
import UnauthorizedError from '@shared/errors/UnauthorizedError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../../user/typeorm/entities/User';
import UserRepository from '../../user/typeorm/repositories/UserRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
	refreshToken?: string;
}

const authErrorMessage = 'Email ou senha incorreto!';

class CreateSessionService {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const repository = getCustomRepository(UserRepository);
		const user = await repository.findByEmail(email);

		if (!user) {
			throw new UnauthorizedError(authErrorMessage);
		}

		const confirmedPass = await compare(password, user.password);

		if (!confirmedPass) {
			throw new UnauthorizedError(authErrorMessage);
		}

		const token = sign({ id: user.id }, AUTH_CONFIG.secret_hash, {
			subject: user.id,
			expiresIn: AUTH_CONFIG.expires_in,
		});

		return { user, token };
	}
}

export default CreateSessionService;
