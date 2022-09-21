import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddCustomerIdToOrders1663720561562 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'order',
			new TableColumn({
				name: 'customer_id',
				type: 'uuid',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'order',
			new TableForeignKey({
				name: 'order_customer',
				columnNames: ['customer_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'customer',
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('order', 'order_customer');
		await queryRunner.dropColumn('order', 'customer_id');
	}
}
