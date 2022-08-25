import { ITeam } from '../interfaces/Teams.interface';
import MatchService from './match.service';
import TeamService from './team.service';

const sortResult = () => {

};

export default class LeaderBoardService {
  static matchesHomeTeam = async (teamId: number) => {
    const matches = await MatchService.getAllProgress('false');
    // => validando o id
    const HomeTeam = matches.filter(({ homeTeam }) => homeTeam === teamId);
    // => total de empates
    const totalDraws = HomeTeam.filter((element) =>
      element.homeTeamGoals === element.awayTeamGoals).length;
    // => total de vitorias
    const totalVictories = HomeTeam.filter((element) =>
      element.homeTeamGoals > element.awayTeamGoals).length;
    // total de partidas perdidas
    const totalLosses = HomeTeam.filter((element) =>
      element.homeTeamGoals < element.awayTeamGoals).length;
    // => total de partidas
    const totalGames = HomeTeam.length;
    return { totalDraws, totalVictories, totalLosses, totalGames };
  };

  static matchesAwayTeam = async (teamId: number) => {
    const matches = await MatchService.getAllProgress('false');
    // => validando o id
    const AwayTeam = matches.filter(({ awayTeam }) => awayTeam === teamId);
    // => total de empates
    const totalDraws = AwayTeam.filter((element) =>
      element.awayTeamGoals === element.homeTeamGoals).length;
    // => total de vitorias
    const totalVictories = AwayTeam.filter((element) =>
      element.awayTeamGoals > element.homeTeamGoals).length;
    // total de partidas perdidas
    const totalLosses = AwayTeam.filter((element) => element.awayTeamGoals < element.homeTeamGoals);
    // => total de partidas
    const soccerMatches = AwayTeam.length;
    return { totalDraws, totalVictories, totalLosses, soccerMatches };
  };

  // => relembrando reduce - O valor de retorno da sua função reducer é atribuída ao acc. O acc, com seu valor atualizado, é repassado para cada iteração subsequente pelo array, que por fim, se tornará o valor resultante, único, final.

  static goalsHome = async (teamId: number) => {
    const matches = await MatchService.getAllProgress('false');
    // =>  total de gols a favor do time da casa
    const goalsFavor = matches.reduce((acc, match) => {
      if (match.homeTeam === teamId) return acc + match.homeTeamGoals;
      return acc;
    }, 0);
    // =>  total de gols contra do time da casa
    const own = matches.reduce((acc, match) => {
      if (match.homeTeam === teamId) return acc + match.awayTeam;
      return acc;
    }, 0);
    return { goalsFavor, own };
  };

  static goalsAway = async (teamId: number) => {
    const matches = await MatchService.getAllProgress('false');
    // =>  total de gols a favor do time da casa
    const goalsFavor = matches.reduce((acc, match) => {
      if (match.awayTeam === teamId) return acc + match.awayTeamGoals;
      return acc;
    }, 0);
    // =>  total de gols contra do time da casa
    const goalsOwn = matches.reduce((acc, match) => {
      if (match.awayTeam === teamId) return acc + match.awayTeamGoals;
      return acc;
    }, 0);
    return { goalsFavor, goalsOwn };
  };

  // => array que cada time, tendo 3 situacoes , jogos de casa e jogos de fora, somando no result
  // => deixando como string (apenas duas casa )
  // => to.fixed(2)

  // => Para calcular o Total de Pontos, você deve levar em consideração que:

  // O time vitorioso: marcará +3 pontos;
  // O time perdedor: marcará 0 pontos;
  // Em caso de empate: ambos os times marcam +1 ponto.
  // Para o campo Aproveitamento do time (%), que é a porcentagem de jogos ganhos, use a seguinte fórmula: P/(J*3)*100, onde:

  // P: Total de Pontos;
  // J: Total de Jogos.
  // Obs.: O seu resultado deverá ser limitado a duas casas decimais.

  // Para calcular Saldo de Gols use a seguinte fórmula: GP - GC, onde:

  // GP: Gols marcados a favor;
  // GC: Gols sofridos.
  // O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no Total de Pontos, você deve levar em consideração os seguintes critérios para desempate:

  static scoreHome = async (team:ITeam) => {
    const matches = await this.matchesHomeTeam(team.id);
    const { goalsFavor, goalsOwn } = await this.goalsAway(team.id);
    const { totalDraws, totalVictories, totalGames, totalLosses } = matches;
    const totalPoints = totalVictories * 3 + totalDraws * 1;

    const teamScore = {
      name: team.teamName,
      totalPoints,
      goalsFavor,
      goalsOwn,
      totalDraws,
      totalVictories,
      totalGames,
      totalLosses,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
    return teamScore;
  };

  static scoreAway = async (team:ITeam) => {
    const matches = await this.matchesHomeTeam(team.id);
    const { totalDraws, totalVictories, totalGames, totalLosses } = matches;
    const { goalsFavor, goalsOwn } = await this.goalsAway(team.id);
    const totalPoints = totalVictories * 3 + totalDraws * 1;
    const teamScore = {
      name: team.teamName,
      totalPoints,
      goalsFavor,
      goalsOwn,
      totalDraws,
      totalVictories,
      totalGames,
      totalLosses,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
    return teamScore;
  };

  // - criterios do resultado

  static chooseTeams = async (chooseTeam: 'home' | 'away') => {
    const Teams = await TeamService.getAll();
    const Scores = [];
    for (let index = 0; index < Teams.length; index += 1) {
      if (chooseTeam === 'home') {
        const score = this.scoreHome(Teams[index]);
        Scores.push(score);
      }
      if (chooseTeam === 'away') {
        const score = this.scoreAway(Teams[index]);
        Scores.push(score);
      }
    }
    const result = await Promise.all(Scores);
    return result;
  };
}
