import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  static async getAll(_request:Request, response: Response) {
    await TeamService.getAll();
    const result = await TeamService.getAll();
    console.log(result);
    response.status(200).json(result);
  }

  static async getById(request:Request, response: Response) {
    const { id } = request.params;
    const result = await TeamService.getById(Number(id));
    response.status(200).json(result);
  }
}
