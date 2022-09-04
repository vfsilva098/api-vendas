import ApiError from '@shared/errors/ApiError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

class UpdateProductService {
	public async execute({
		id,
		name,
		price,
		quantity,
	}: IRequest): Promise<Product> {
		const repository = getCustomRepository(ProductRepository);
		const product = await repository.findOne(id);

		if (!product) {
			throw new ApiError('Produto não encontrado!');
		}

		const alreadyExists = await repository.findByName(name);

		if (alreadyExists && name !== product.name) {
			throw new ApiError('Nome do produto já cadastrado!');
		}

		product.name = name;
		product.price = price;
		product.quantity = quantity;

		await repository.save(product);

		return product;
	}
}

export default UpdateProductService;
