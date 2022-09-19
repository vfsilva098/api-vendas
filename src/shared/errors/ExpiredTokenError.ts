import HTTPStatusEnum from '@shared/http/enum/HTTPStatusEnum';
import ApiError from './ApiError';

class ExpiredTokenError {
	constructor(message: string) {
		throw new ApiError(message, HTTPStatusEnum.UNAUTHORIZED);
	}
}

export default ExpiredTokenError;
