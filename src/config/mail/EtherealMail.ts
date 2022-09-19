import {
	createTestAccount,
	createTransport,
	getTestMessageUrl,
} from 'nodemailer';
import { IParseMailTemplate } from './template/HandlebarsMailTemplate';

import HandlebarsMailTemplate from './template/HandlebarsMailTemplate';

interface IMailContact {
	name: string;
	email: string;
}

interface ISendEmail {
	to: IMailContact;
	from?: IMailContact;
	subject: string;
	htmlTemplate: IParseMailTemplate;
}

export default class EtherealMail {
	static async sendMail({
		to,
		from,
		subject,
		htmlTemplate,
	}: ISendEmail): Promise<void> {
		const account = await createTestAccount();
		const transporter = createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			},
		});

		const mailTemplate = new HandlebarsMailTemplate();

		const message = await transporter.sendMail({
			from: {
				name: from?.name || 'Support API Vendas',
				address: from?.email || 'support@apivendas.com.br',
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject: subject,
			html: await mailTemplate.parse(htmlTemplate),
		});

		console.log('Message sent %s', message.messageId);
		console.log('Preview URL: %s', getTestMessageUrl(message));
	}
}
