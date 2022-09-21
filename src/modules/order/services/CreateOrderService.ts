import CustomerRespository from '@modules/customers/typeorm/repositories/CustomerRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import ApiError from '@shared/errors/ApiError';
import NotFoundError from '@shared/errors/NotFoundError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrderRepository } from '../typeorm/repositories/OrderRepository';

interface IProduct {
	id: string;
	quantity: number;
}

interface IRequest {
	customer_id: string;
	productsRequest: IProduct[];
}
class CreateOrderService {
	public async execute({
		customer_id,
		productsRequest,
	}: IRequest): Promise<Order> {
		const repository = getCustomRepository(OrderRepository);
		const repositoryCustomer = getCustomRepository(CustomerRespository);
		const repositoryProduct = getCustomRepository(ProductRepository);

		const customer = await repositoryCustomer.findById(customer_id);

		if (!customer) {
			throw new NotFoundError('Cliente não encontrado!');
		}

		const products = await repositoryProduct.findAllByIds(productsRequest);

		if (!products) {
			throw new NotFoundError('Nenhum produto encontrado!');
		}

		const productsIds = products.map(product => product.id);
		const check = productsRequest.filter(
			product => !productsIds.includes(product.id),
		);

		if (check.length) {
			throw new ApiError(`Produtos não encontrados: ${check.toString}`);
		}

		const checkQuantities = productsRequest.filter(
			product =>
				products.filter(p => p.id === product.id)[0].quantity <
				product.quantity,
		);

		if (checkQuantities) {
			throw new ApiError(
				`Quantidade dos produtos: ${checkQuantities[0].id} está acima do estoque!`,
			);
		}

		const serializedProducts = productsRequest.map(product => ({
			product_id: product.id,
			quantity: product.quantity,
			price: products.filter(p => p.id === product.id)[0].price,
		}));

		const order = await repository.createOrder({
			customer,
			products: serializedProducts,
		});

		const { order_products } = order;

		const updatedProductQuantity = order_products.map(order_product => ({
			id: order_product.product.id,
			quantity:
				products.filter(product => product.id === order_product.product.id)[0]
					.quantity - order_product.quantity,
		}));

		await repositoryProduct.save(updatedProductQuantity);

		return order;
	}
}

export default CreateOrderService;
