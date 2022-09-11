import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '../controllers/SessionController';

const authRouter = Router();
const authController = new SessionController();

authRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	authController.signIn,
);

export default authRouter;
