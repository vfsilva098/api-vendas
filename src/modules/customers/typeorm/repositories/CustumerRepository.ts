import { EntityRepository, Repository } from 'typeorm';
import Custumer from '../entities/Custumer';

@EntityRepository(Custumer)
export default class CustumerRespository extends Repository<Custumer> {
	public async findByName(name: string): Promise<Custumer | undefined> {
		return await this.findOne({
			where: {
				name,
			},
		});
	}

	public async findById(id: string): Promise<Custumer | undefined> {
		return await this.findOne({
			where: {
				id,
			},
		});
	}

	public async findByEmail(email: string): Promise<Custumer | undefined> {
		return await this.findOne({
			where: {
				email,
			},
		});
	}
}
