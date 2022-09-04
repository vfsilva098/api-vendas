import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const controller = new ProductController();

productsRouter.get('/', controller.index);

productsRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	controller.show,
);

productsRouter.put(
	'/:id',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string(),
			price: Joi.number().precision(2),
			quantity: Joi.number(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	controller.update,
);

productsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required(),
		},
	}),
	controller.create,
);
productsRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	controller.delete,
);

export default productsRouter;
