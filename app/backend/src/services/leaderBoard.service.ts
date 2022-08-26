import { IScore } from '../interfaces/leaderboard';
import { ITeam } from '../interfaces/Teams.interface';
import MatchService from './match.service';
import TeamService from './team.service';

// => criando criterios para o desempate
const sortResult = (prev: IScore, curr: IScore) => {
  let result = curr.totalPoints - prev.totalPoints;
  if (!result) result = curr.totalVictories - prev.totalVictories;
  // total dos gols
  if (!result) result = curr.goalsBalance - prev.goalsBalance;
  // total de vitorias
  if (!result) result = curr.goalsFavor - prev.goalsFavor;
  // total de gols a favor
  if (!result) result = curr.goalsOwn - prev.goalsOwn;
  // total de gols contra
  return result;
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
      element.homeTeamGoals < element.awayTeam).length;
    // total de partidas perdidas
    const totalLosses = AwayTeam.filter((element) => element.homeTeamGoals > element.awayTeamGoals);
    // => total de partidas
    const soccerMatches = AwayTeam.length;
    return { totalDraws, totalVictories, totalLosses, soccerMatches };
  };

  // => relembrando reduce - O valor de retorno da sua função reducer é atribuída ao acc. O acc, com seu valor atualizado, é repassado para cada iteração subsequente pelo array, que por fim, se tornará o valor resultante, único, final.

  static goalsHome = async (teamId: number) => {
    const matches = await MatchService.getAllProgress('false');
    let goalsFavor = 0;
    matches.forEach((element) => {
      if (element.homeTeam === teamId) {
        goalsFavor += element.homeTeamGoals;
      }
    });

    let goalsOwn = 0;
    matches.forEach((element) => {
      if (element.homeTeam === teamId) {
        goalsOwn += element.awayTeamGoals;
      }
    });
    return { goalsFavor, goalsOwn };
  };

  static goalsAway = async (teamId: number) => {
    const matches = await MatchService.getAllProgress('false');

    let goalsFavor = 0;
    matches.forEach((element) => {
      if (element.awayTeam === teamId) {
        goalsFavor += element.awayTeamGoals;
      }
    });

    let goalsOwn = 0;
    matches.forEach((element) => {
      if (element.awayTeam === teamId) {
        goalsOwn += element.homeTeamGoals;
      }
    });

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
    const { goalsFavor, goalsOwn } = await this.goalsHome(team.id);
    const { totalDraws, totalVictories, totalGames, totalLosses } = matches;
    const totalPoints = totalVictories * 3 + totalDraws * 1;

    const teamScore = {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
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
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
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
    // => fazendo um sort nos criterios
    return result.sort(sortResult);
  };
}
