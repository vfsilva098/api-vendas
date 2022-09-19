import EtherealMail from '@config/mail/EtherealMail';
import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import path from 'path';
import { BASE_URL } from '@shared/constants';

class SendForgotPasswordEmailService {
	public async execute(email: string): Promise<void> {
		const repository = getCustomRepository(UserRepository);
		const userTokenRepository = getCustomRepository(UserTokenRepository);
		const user = await repository.findByEmail(email);

		if (!user) {
			throw new NotFoundError('Email não cadastrado!');
		}

		const { token } = await userTokenRepository.generate(user.id);

		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
			'views',
			'forgot_password.hbs',
		);

		EtherealMail.sendMail({
			to: {
				name: user.name,
				email,
			},
			subject: '[API Vendas] Recuperação de senha.',
			htmlTemplate: {
				template: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: BASE_URL.concat(`reset_password?token=${token}`),
				},
			},
		});
	}
}

export default SendForgotPasswordEmailService;
