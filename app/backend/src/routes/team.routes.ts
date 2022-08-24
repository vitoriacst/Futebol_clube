import { Request, Response, Router } from 'express';

import TeamController from '../controllers/teamController';

const team:Router = Router();

team.get(' /teams', (req: Request, res : Response) => TeamController.getAll(req, res));
