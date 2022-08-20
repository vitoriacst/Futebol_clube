import { Request, Response, Router } from 'express';
import UserController from '../controllers/userController';

const user:Router = Router();
user.post('/login', (req:Request, res: Response) => UserController.login(req, res));
user.get('/users', (req:Request, res: Response) => UserController.getAllUsers(req, res));

export default user;
