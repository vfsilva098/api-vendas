import HTTPStatusEnum from '@shared/http/enum/HTTPStatusEnum';
import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { email } = req.body;
		const service = new SendForgotPasswordEmailService();
		await service.execute(email);

		return res.status(HTTPStatusEnum.NO_CONTENT).json({});
	}
}
