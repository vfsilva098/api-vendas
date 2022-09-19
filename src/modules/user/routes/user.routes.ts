import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserController from '../controllers/UserController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UploadAvatarController from '../controllers/UploadAvatarController';

const usersRouter = Router();
const usersController = new UserController();
const avatarController = new UploadAvatarController();
const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);
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
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			old_password: Joi.string(),
			password: Joi.string().optional(),
			password_confirmation: Joi.string()
				.optional()
				.valid(Joi.ref('password'))
				.when('password', { is: Joi.exist(), then: Joi.required() }),
		},
	}),
	usersController.update,
);
usersRouter.get(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	usersController.findById,
);
usersRouter.delete(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	usersController.delete,
);
usersRouter.patch(
	'/avatar',
	isAuthenticated,
	upload.single('avatar'),
	avatarController.update,
);

export default usersRouter;
