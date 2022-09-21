import AlreadyExistsError from '@shared/errors/AlreadyExistsError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
	name: string;
	price: number;
	quantity: number;
}
class CreateProductService {
	public async execute({ name, price, quantity }: IRequest): Promise<Product> {
		const repository = getCustomRepository(ProductRepository);
		const alreadyExists = await repository.findByName(name);

		if (alreadyExists) {
			throw new AlreadyExistsError('Nome do produto já cadastrado!');
		}

		const product = repository.create({
			name,
			price,
			quantity,
		});

		await repository.save(product);

		return product;
	}
}

export default CreateProductService;
