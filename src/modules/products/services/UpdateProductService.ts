import AlreadyExistsError from '@shared/errors/AlreadyExistsError';
import ApiError from '@shared/errors/ApiError';
import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
	id: string;
	name?: string;
	price?: number;
	quantity?: number;
}

class UpdateProductService {
	public async execute({
		id,
		name,
		price,
		quantity,
	}: IRequest): Promise<Product> {
		if (!name && !price && !quantity) {
			throw new ApiError('Preencher campos obrigatórios!');
		}
		const repository = getCustomRepository(ProductRepository);
		const product = await repository.findOne(id);

		if (!product) {
			throw new NotFoundError('Produto não encontrado!');
		}

		if (name) {
			const alreadyExists = await repository.findByName(name);

			if (alreadyExists && name !== product.name) {
				throw new AlreadyExistsError('Nome do produto já cadastrado!');
			}

			product.name = name;
		}

		if (price) {
			product.price = price;
		}

		if (quantity) {
			product.quantity = quantity;
		}

		await repository.save(product);

		return product;
	}
}

export default UpdateProductService;
