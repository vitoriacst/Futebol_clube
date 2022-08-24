import { Request, Response, Router } from 'express';
import TeamController from '../controllers/teamController';
import UserController from '../controllers/userController';

const application:Router = Router();

application.post('/login', (req:Request, res: Response) => UserController.login(req, res));

application.get('/login/validate', (req:Request, res: Response) =>
  UserController.validateUser(req, res));

application.get('/teams', (req:Request, res: Response) => TeamController.getAll(req, res));

export default application;
