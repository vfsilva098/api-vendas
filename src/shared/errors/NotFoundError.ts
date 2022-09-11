import HTTPStatusEnum from '@shared/http/enum/HTTPStatusEnum';
import ApiError from './ApiError';

class NotFoundError {
	constructor(message: string) {
		throw new ApiError(message, HTTPStatusEnum.NOT_FOUND);
	}
}

export default NotFoundError;
