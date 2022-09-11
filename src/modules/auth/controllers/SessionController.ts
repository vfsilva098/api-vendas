import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionController {
	public async signIn(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;
		const service = new CreateSessionService();
		const authenticated = await service.execute({ email, password });

		return res.json(authenticated);
	}
}
