import Teams from '../database/models/team.model';
import { ITeamService } from '../interfaces/Teams.interface';

export default class TeamService implements ITeamService {
  // => forma que ele possa retornar todos os times corretamente
  public getAll = async (): Promise<Teams[]> => {
    const team : Teams[] = await Teams.findAll();
    return team;
  };
}
