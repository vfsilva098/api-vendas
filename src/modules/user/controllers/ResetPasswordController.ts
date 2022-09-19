import HTTPStatusEnum from '@shared/http/enum/HTTPStatusEnum';
import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { token, password } = req.body;
		const service = new ResetPasswordService();
		await service.execute({ token, password });

		return res.status(HTTPStatusEnum.NO_CONTENT).json({});
	}
}
