import { Router } from 'express';
import productsRouter from '@modules/products/routes/product.routes';
import usersRouter from '@modules/user/routes/user.routes';
import authRouter from '@modules/auth/routes/auth.routes';
import passwordRouter from '@modules/user/routes/password.routes';
import customerRouter from '@modules/customers/routes/customer.routes';

const routes = Router();

routes.use('/product', productsRouter);
routes.use('/user', usersRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);
routes.use('/customer', customerRouter);

export default routes;
