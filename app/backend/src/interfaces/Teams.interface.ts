import Teams from '../database/models/team.model';

export interface ITeam{
  id: number,
  teamName: string,
}

export interface ITeamService {
  getAll(): Promise<Teams[]>,
  // getById(id: number): Promise<Teams>
}
