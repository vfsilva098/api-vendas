import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UserController {
	public async index(req: Request, res: Response): Promise<Response> {
		const service = new ListUserService();
		const users = await service.execute();

		return res.json(users);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;
		const service = new CreateUserService();
		const user = await service.execute({ name, email, password });

		return res.json(user);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const service = new DeleteUserService();
		await service.execute(id);

		return res.json([]);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { name, email, password } = req.body;
		const service = new UpdateUserService();
		const user = await service.execute({ id, name, email, password });

		return res.json(user);
	}

	public async findById(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const service = new ShowUserService();
		const user = await service.execute(id);

		return res.json(user);
	}
}
