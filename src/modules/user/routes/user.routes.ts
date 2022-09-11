import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UserController();

usersRouter.get('/', usersController.index);
usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	usersController.create,
);
usersRouter.put(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string(),
			email: Joi.string().email(),
			password: Joi.string(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	usersController.create,
);
usersRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	usersController.findById,
);
usersRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	usersController.delete,
);

export default usersRouter;
