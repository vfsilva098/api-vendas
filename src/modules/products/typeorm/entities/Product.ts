import OrderProduct from '@modules/order/typeorm/entities/OrderProduct';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column('decimal')
	price: number;

	@Column('int')
	quantity: number;

	@OneToMany(() => OrderProduct, order_product => order_product.product)
	order_products: OrderProduct[];

	@Column('time with time zone')
	created_at: Date;

	@Column('time with time zone')
	updated_at: Date;
}

export default Product;
