import { Request, Response } from 'express';
import MatchService from '../services/match.service';

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

  }
}
