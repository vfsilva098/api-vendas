import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import CustomerController from '../controllers/CustomerController';

const customerRouter = Router();
const controller = new CustomerController();

customerRouter.get('/', isAuthenticated, controller.index);

customerRouter.get(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	controller.show,
);

customerRouter.put(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	controller.update,
);

customerRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
		},
	}),
	controller.create,
);
customerRouter.delete(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	controller.delete,
);

export default customerRouter;
