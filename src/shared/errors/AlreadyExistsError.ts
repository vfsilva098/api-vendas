import HTTPStatusEnum from '@shared/http/enum/HTTPStatusEnum';
import ApiError from './ApiError';

class AlreadyExistsError {
	constructor(message: string) {
		throw new ApiError(message, HTTPStatusEnum.CONFLICT);
	}
}

export default AlreadyExistsError;
