import UnauthorizedError from '@shared/errors/UnauthorizedError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
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

		return { user };
	}
}

export default CreateSessionService;
