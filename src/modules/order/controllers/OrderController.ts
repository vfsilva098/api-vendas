import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrderController {
	public async show(req: Request, res: Response) {
		const { id } = req.params;
		const service = new ShowOrderService();
		const order = await service.execute({ id });

		return res.json(order);
	}

	public async create(req: Request, res: Response) {
		const { customer_id, products } = req.body;
		const service = new CreateOrderService();
		const product = await service.execute({
			customer_id,
			productsRequest: products,
		});

		return res.status(201).json(product);
	}
}
