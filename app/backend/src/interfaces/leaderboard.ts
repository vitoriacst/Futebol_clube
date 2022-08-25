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
  name:string,
  points: number,
  games: number,
  losses: number,
  victories: number,
  goalsLosses:number,
  goalsFavor:number,
  goalsOwn: number,
  goalsTotal: number,
  efficiency: string
}
