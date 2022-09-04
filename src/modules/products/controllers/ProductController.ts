import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductController {
	public async index(req: Request, res: Response) {
		const service = new ListProductService();
		const products = await service.execute();

		return res.json(products);
	}

	public async show(req: Request, res: Response) {
		const { id } = req.params;
		const service = new ShowProductService();
		const product = await service.execute(id);

		return res.json(product);
	}

	public async create(req: Request, res: Response) {
		const { name, price, quantity } = req.body;
		const service = new CreateProductService();
		const product = await service.execute({ name, price, quantity });

		return res.status(201).json(product);
	}

	public async update(req: Request, res: Response) {
		const { name, price, quantity } = req.body;
		const { id } = req.params;
		const service = new UpdateProductService();
		const product = await service.execute({ id, name, price, quantity });

		return res.json(product);
	}

	public async delete(req: Request, res: Response) {
		const { id } = req.params;
		const service = new DeleteProductService();

		await service.execute(id);

		return res.json([]);
	}
}
