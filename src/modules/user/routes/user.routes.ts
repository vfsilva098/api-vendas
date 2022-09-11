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
