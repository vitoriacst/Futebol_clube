import Match from '../database/models/matches.model';
import Teams from '../database/models/team.model';
import { IMatch } from '../interfaces/Match.interface';
import Errors from '../middlewares/Errors';
import TeamService from './team.service';

// {
//   [
//     {
//       "id": 1,
//       "homeTeam": 16,
//       "homeTeamGoals": 1,
//       "awayTeam": 8,
//       "awayTeamGoals": 1,
//       "inProgress": false,
//       "teamHome": {
//         "teamName": "São Paulo"
//       },
//       "teamAway": {
//         "teamName": "Grêmio"
//       }
//     },
//     ...
//     {
//       "id": 41,
//       "homeTeam": 16,
//       "homeTeamGoals": 2,
//       "awayTeam": 9,
//       "awayTeamGoals": 0,
//       "inProgress": true,
//       "teamHome": {
//         "teamName": "São Paulo"
//       },
//       "teamAway": {
//         "teamName": "Internacional"
//       }
//     }
//   ]
// }

export default class MatchService {
  static getAll = async () => {
    const matches = await Match.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  // vai pegar todos que tenham a chave inprogress
  static getAllProgress = async (inProgress: string): Promise<Match[]> => {
    const matches = await Match.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: { inProgress },
    });
    return matches;
  };

  static saveMatch = async (match:IMatch) : Promise<Match> => {
    const Team = await TeamService.getAll();
    console.log(Team, 'team ');
    const Compare = Team
      .some((element) =>
        element.id === match.awayTeam);

    const teste = Team
      .some((element) => element.id === match.homeTeam);

    if (!Compare) {
      throw new Errors(404, 'There is no team with such id!');
    }
    if (!teste) {
      throw new Errors(404, 'There is no team with such id!');
    }

    const result = await Match.create({
      ...match,
      inProgress: true,
    });
    return result;
  };

  static finallyMatch = async (id: number) => {
    await Match.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );
  };

  static updateMatch = async (id: number, match: IMatch) => {
    await Match.update(match, { where: { id } });
    const result = await Match.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: { id },
    });
    return result;
  };
}
