import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  static async getAll(_request:Request, response: Response) {
    await TeamService.getAll();
    const result = await TeamService.getAll();
    response.status(200).json(result);
  }
}
