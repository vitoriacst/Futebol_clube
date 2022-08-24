import { Request, Response, Router } from 'express';
import MatchController from '../controllers/matches.controller';
import TeamController from '../controllers/teamController';
import UserController from '../controllers/userController';

const application:Router = Router();

application.post('/login', (req:Request, res: Response) => UserController.login(req, res));

application.get('/login/validate', (req:Request, res: Response) =>
  UserController.validateUser(req, res));

application.get('/teams', (req:Request, res: Response) => TeamController.getAll(req, res));

application.get('/teams/:id', (req:Request, res: Response) => TeamController.getById(req, res));

application.get(
  '/matches',
  (req:Request, res: Response) => MatchController.getAll(req, res),
);

export default application;
