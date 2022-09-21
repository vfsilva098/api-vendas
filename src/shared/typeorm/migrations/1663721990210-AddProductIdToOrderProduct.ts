import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddProductIdToOrderProduct1663721990210
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'order_product',
			new TableColumn({
				name: 'product_id',
				type: 'uuid',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'order_product',
			new TableForeignKey({
				name: 'product_order_product',
				columnNames: ['product_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'products',
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('order_product', 'product_order_product');
		await queryRunner.dropColumn('order_product', 'product_id');
	}
}
