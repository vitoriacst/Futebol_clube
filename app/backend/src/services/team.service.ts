import Teams from '../database/models/team.model';
import Errors from '../middlewares/Errors';

export default class TeamService {
  // => forma que ele possa retornar todos os times corretamente
  static getAll = async (): Promise<Teams[]> => {
    const team : Teams[] = await Teams.findAll();
    return team;
  };

  static getById = async (id: number) => {
    const team = await Teams.findByPk(id);
    // -> O método findByPk obtém apenas uma única entrada da tabela, usando a chave primária fornecida.
    if (!team) throw new Errors(404, 'No team was found with this');
    return team;
  };
}
