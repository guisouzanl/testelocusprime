import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import ProductController from './app/controllers/ProductsController';
import UserProductController from './app/controllers/UserProductController';
import SaleController from './app/controllers/SalesController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/products', ProductController.store);
routes.get('/products', ProductController.index);
routes.get('/products/:id', UserProductController.index);
routes.put('/products/:id', UserProductController.update);
routes.post('/sales/:id', SaleController.store);
routes.get('/sales', SaleController.index);

export default routes;
