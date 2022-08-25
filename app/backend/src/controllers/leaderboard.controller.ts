import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  static async home(_request: Request, response: Response): Promise<void> {
    const result = await LeaderBoardService.chooseTeams('home');
    const statusOk = 200;
    response.status(statusOk).json(result);
  }
}
