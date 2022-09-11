import { Router } from 'express';
import productsRouter from '@modules/products/routes/product.routes';
import usersRouter from '@modules/user/routes/user.routes';
import authRouter from '@modules/auth/routes/auth.routes';

const routes = Router();

routes.use('/product', productsRouter);
routes.use('/user', usersRouter);
routes.use('/auth', authRouter);

export default routes;
