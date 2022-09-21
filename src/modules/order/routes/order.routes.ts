import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import OrderController from '../controllers/OrderController';

const orderRouter = Router();
const controller = new OrderController();

orderRouter.get(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	controller.show,
);

orderRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			customer_id: Joi.string().required(),
			products: Joi.required(),
		},
	}),
	controller.create,
);

export default orderRouter;
