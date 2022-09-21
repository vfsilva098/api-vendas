import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ShowProductService {
	public async execute(id: string): Promise<Product> {
		const repository = getCustomRepository(ProductRepository);
		const product = await repository.findOne(id);

		if (!product) {
			throw new NotFoundError('Produto não encontrado!');
		}
		return product;
	}
}

export default ShowProductService;
