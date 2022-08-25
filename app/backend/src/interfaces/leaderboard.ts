export interface IMatches {
  totalDraws: number,
  totalVictories: number,
  totalLosses:number,
  totalGames: number
}

export interface IGoals {
  goalsFavor: number;
  goalsOwn: number
}

export interface IScore{
  name: string;
  totalGames: number;
  totalPoints: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsOwn: number;
  goalsFavor: number;
  efficiency: string
  goalsBalance: number;
}
