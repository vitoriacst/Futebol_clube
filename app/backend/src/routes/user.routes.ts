import { Request, Response, Router } from 'express';
import UserController from '../controllers/userController';

const user:Router = Router();

user.post('/login', (req:Request, res: Response) => UserController.login(req, res));
user.get('/users', (req:Request, res: Response) => UserController.getAllUsers(req, res));
// user.get('/validate', (request, response) => UserController.validateUser(request, response));

export default user;
