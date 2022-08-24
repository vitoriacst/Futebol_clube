import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  static async getAll(_request:Request, response: Response) {
    await TeamService.getAll();
    const result = await TeamService.getAll();
    console.log(result);
    response.status(200).json(result);
  }
}
