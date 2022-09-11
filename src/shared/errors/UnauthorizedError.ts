import ApiError from './ApiError';

class UnauthorizedError {
	constructor(message: string) {
		throw new ApiError(message, 401);
	}
}

export default UnauthorizedError;
