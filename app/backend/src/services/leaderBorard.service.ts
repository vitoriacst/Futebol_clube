import MatchService from './match.service';

export default class LeaderBoardService {
  static matchesHomeTeam = async (teamId: number) => {
    const matches = await MatchService.getAllProgress('false');
    // => validando o id
    const HomeTeam = matches.filter(({ homeTeam }) => homeTeam === teamId);
    // => total de empates
    const draws = HomeTeam.filter((element) => element.homeTeamGoals === element.awayTeamGoals);
    // => total de vitorias
    const victories = HomeTeam.filter((element) => element.homeTeamGoals > element.awayTeamGoals);
    // total de partidas perdidas
    const losses = HomeTeam.filter((element) => element.homeTeamGoals < element.awayTeamGoals);
    // => total de partidas
    const soccerMatches = HomeTeam.length;
    return { draws, victories, losses, soccerMatches };
  };

  static matchesAwayTeam = async (teamId: number) => {
    const matches = await MatchService.getAllProgress('false');
    // => validando o id
    const AwayTeam = matches.filter(({ awayTeam }) => awayTeam === teamId);
    // => total de empates
    const draws = AwayTeam.filter((element) => element.awayTeamGoals === element.homeTeamGoals);
    // => total de vitorias
    const victories = AwayTeam.filter((element) => element.awayTeamGoals > element.homeTeamGoals);
    // total de partidas perdidas
    const losses = AwayTeam.filter((element) => element.awayTeamGoals < element.homeTeamGoals);
    // => total de partidas
    const soccerMatches = AwayTeam.length;
    return { draws, victories, losses, soccerMatches };
  };

  // => relembrando reduce - O valor de retorno da sua função reducer é atribuída ao acc. O acc, com seu valor atualizado, é repassado para cada iteração subsequente pelo array, que por fim, se tornará o valor resultante, único, final.

  static goals = async (teamId: number) => {
    const matches = await MatchService.getAllProgress('false');
    // =>  total de gols a favor do time da casa
    const favor = matches.reduce((acc, match) => {
      if (match.homeTeam === teamId) return acc + match.homeTeamGoals;
      return acc;
    }, 0);
    // =>  total de gols contra do time da casa
    const own = matches.reduce((acc, match) => {
      if (match.homeTeam === teamId) return acc + match.awayTeam;
      return acc;
    }, 0);
    return { favor, own };
  };
}
