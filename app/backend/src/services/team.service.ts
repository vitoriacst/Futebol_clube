import Teams from '../database/models/team.model';

export default class TeamService {
  // => forma que ele possa retornar todos os times corretamente
  static getAll = async (): Promise<Teams[]> => {
    const team : Teams[] = await Teams.findAll();
    return team;
  };

  static getById = async () => {

  };
}
