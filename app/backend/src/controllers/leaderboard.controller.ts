import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  static async home(_request: Request, response: Response): Promise<void> {
    const result = await LeaderBoardService.chooseTeams('home');
    response.status(200).json(result);
  }

  static async away(_request: Request, response: Response): Promise<void> {
    const result = await LeaderBoardService.chooseTeams('away');
    response.status(200).json(result);
  }
}
