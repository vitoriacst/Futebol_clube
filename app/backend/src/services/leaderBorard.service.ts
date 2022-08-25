import { IMatch } from '../interfaces/Match.interface';
import MatchService from './match.service';

export default class LeaderBoardService {
  static matchesHomeTeam = async (teamId: number): Promise<IMatch> => {
    const matches = await MatchService.getAllProgress('false');
    // => validando o id
    const HomeTeam = matches.filter(({ homeTeam }) => homeTeam === teamId);
    // => total de empates
    const draws = HomeTeam.filter((element) => element.homeTeamGoals === element.awayTeamGoals);
    // => total de vitorias
    const victories = HomeTeam.filter((element) => element.homeTeamGoals > element.awayTeamGoals);
    // total de partidas perdidas
    const Losses = HomeTeam.filter((element) => element.homeTeamGoals < element.awayTeamGoals);
  };
}
