import ApiError from '@shared/errors/ApiError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class DeleteProductService {
	public async execute(id: string): Promise<void> {
		const repository = getCustomRepository(ProductRepository);
		const product = await repository.findOne(id);

		if (!product) {
			throw new ApiError('Produto não encontrado!');
		}

		await repository.remove(product);
	}
}

export default DeleteProductService;
