import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class CustomerController {
	public async index(req: Request, res: Response): Promise<Response> {
		const service = new ListCustomerService();
		const customers = await service.execute();

		return res.json(customers);
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const service = new ShowCustomerService();
		const customer = await service.execute(id);

		return res.json(customer);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email } = req.body;
		const service = new CreateCustomerService();
		const customer = await service.execute({ name, email });

		return res.status(201).json(customer);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { name, email } = req.body;
		const { id } = req.params;
		const service = new UpdateCustomerService();
		const customer = await service.execute({ id, name, email });

		return res.json(customer);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const service = new DeleteCustomerService();

		await service.execute(id);

		return res.json([]);
	}
}
