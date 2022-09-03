import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error: Error, req: Request, resp: Response) => {
	if (error instanceof AppError) {
		return resp.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}

	return resp.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
});

app.listen(3333, () => {
	console.warn('Server started on url: http://localhost:3333/');
});
