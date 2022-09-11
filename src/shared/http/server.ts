import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import ApiError from '@shared/errors/ApiError';
import { errors } from 'celebrate';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof ApiError) {
		return res.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}

	return res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
});

app.listen(3333, () => {
	console.warn('Server started on url: http://localhost:3333/');
});
