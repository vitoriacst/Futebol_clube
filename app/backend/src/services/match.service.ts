import Match from '../database/models/matches.model';
import Teams from '../database/models/team.model';

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
}
