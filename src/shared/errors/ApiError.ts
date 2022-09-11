import HTTPStatusEnum from '@shared/http/enum/HTTPStatusEnum';

class ApiError {
	public readonly message: string;
	public readonly statusCode: number;

	constructor(message: string, statusCode = HTTPStatusEnum.BAD_REQUEST) {
		this.message = message;
		this.statusCode = statusCode;
	}
}

export default ApiError;
