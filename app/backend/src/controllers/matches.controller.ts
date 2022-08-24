import { Request, Response } from 'express';
import Errors from '../middlewares/Errors';
import JwtService from '../services/Jwt.service';
import MatchService from '../services/match.service';
// import TeamService from '../services/team.service';

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
      throw new Errors(401, 'It is not possible to create a match with two equal teams');
    }
    await JwtService.validateToken(token);
    // await Promise.all([TeamService.getById(homeTeam), TeamService.getById(awayTeam)]);
    const result = await MatchService.saveMatch(request.body);
    response.status(200).json(result);
  }

  static async finallyMatch(request: Request, response: Response) {
    const { id } = request.params;
    await MatchService.finallyMatch(Number(id));
    response.status(200).json({ message: 'Finished' });
  }
}
