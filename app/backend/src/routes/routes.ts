import { Request, Response, Router } from 'express';
import LeaderBoardController from 'src/controllers/leaderboard.controller';
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

application.patch(
  '/matches/:id/finish',
  (request, response) => MatchController.finallyMatch(request, response),
);

application.patch(
  '/matches/:id',
  (request, response) => MatchController.updateMatch(request, response),
);

application.post('/matches', (request, response) => MatchController.saveMatch(request, response));

application.get('/home', (request, response) =>
  LeaderBoardController.chooseTeams(request, response));

application.get('/away', (request, response) =>
  LeaderBoardController.chooseTeams(request, response));

export default application;

// -> teste
