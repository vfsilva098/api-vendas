import upload from '@config/upload';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import ShowUserService from './ShowUserService';
import ApiError from '@shared/errors/ApiError';

interface IRequest {
	userId: string;
	avatarFileName: string;
}

class UpdateUserAvatarService {
	public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
		const repository = getCustomRepository(UserRepository);
		const showService = new ShowUserService();
		const user = await showService.execute(userId);

		if (user.avatar) {
			const pathAvatarFile = path.join(upload.directory, user.avatar);
			const existsFile = await fs.promises.stat(pathAvatarFile);

			if (existsFile) {
				fs.unlink(pathAvatarFile, () => {
					throw new ApiError('Falha ao deletar arquivo!');
				});
			}
		}

		user.avatar = avatarFileName;

		await repository.save(user);

		return user;
	}
}

export default UpdateUserAvatarService;
