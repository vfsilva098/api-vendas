import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddOrderIdToOrderProduct1663721624780
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'order_product',
			new TableColumn({
				name: 'order_id',
				type: 'uuid',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'order_product',
			new TableForeignKey({
				name: 'order_order_product',
				columnNames: ['order_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'order',
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('order_product', 'order_order_product');
		await queryRunner.dropColumn('order_product', 'order_id');
	}
}
