import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import ShowProductService from './ShowProductService';

class DeleteProductService {
	public async execute(id: string): Promise<void> {
		const showService = new ShowProductService();
		const repository = getCustomRepository(ProductRepository);
		const product = await showService.execute(id);

		await repository.remove(product);
	}
}

export default DeleteProductService;
