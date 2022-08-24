import { Request, Response } from 'express';
import { IMatchService } from '../interfaces/Match.interface';
import { ITeamService } from '../interfaces/Teams.interface';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(
    private _MatchService: IMatchService,
    private _TeamService: ITeamService,
  ) {}

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
}
