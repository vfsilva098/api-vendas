import { Router } from 'express';
import productsRouter from '@modules/products/routes/product.routes';
import usersRouter from '@modules/user/routes/user.routes';

const routes = Router();

routes.use('/product', productsRouter);
routes.use('/user', usersRouter);

export default routes;
