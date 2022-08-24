import { Request, Response } from 'express';
import Errors from '../middlewares/Errors';
import JwtService from '../services/Jwt.service';
import MatchService from '../services/match.service';
import TeamService from '../services/team.service';

export default class MatchController {
  static async getAll(request: Request, response: Response) {
    const { inProgress } = request.query;
    let result = [];
    if (typeof inProgress === 'string') {
      result = await MatchService.getAllProgress(
        JSON.parse(inProgress),
      );
    } else {
      result = await MatchService.getAll();
    }
    response.status(200).json(result);
  }

  static async getAllProgress(
    inProgress: string,
    response: Response,
  ) {
    const result = await MatchService.getAllProgress(inProgress);
    response.status(200).json(result);
  }

  static async saveMatch(request: Request, response: Response) : Promise<void> {
    const { homeTeam, awayTeam } = request.body;
    const token = request.headers.authorization || '';
    if (homeTeam === awayTeam) {
      throw new Errors(401, 'impossible combination, both are the same team');
    }
    await JwtService.validateToken(token);
    await Promise.all([TeamService.getById(homeTeam), TeamService.getById(awayTeam)]);
    const result = await MatchService.saveMatch();
    response.status(200).json(result);
  }
}
