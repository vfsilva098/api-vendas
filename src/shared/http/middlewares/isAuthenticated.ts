import { AUTH_CONFIG } from '@config/auth';
import UnauthorizedError from '@shared/errors/UnauthorizedError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const auth = req.headers.authorization;

	if (!auth) {
		throw new UnauthorizedError('Token JWT obrigatório!');
	}

	const [, token] = auth.split(' ');

	try {
		const decoded = verify(token, AUTH_CONFIG.secret_hash);

		const { sub } = decoded;

		req.user = {
			id: sub as string,
		};

		return next();
	} catch {
		throw new UnauthorizedError('Token inválido!');
	}
}
