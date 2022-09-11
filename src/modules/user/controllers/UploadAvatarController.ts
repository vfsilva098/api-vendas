import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UploadAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
		const service = new UpdateUserAvatarService();
		const user = await service.execute({
			userId: req.user.id,
			avatarFileName: req.file?.filename as string,
		});

		return res.json(user);
	}
}
