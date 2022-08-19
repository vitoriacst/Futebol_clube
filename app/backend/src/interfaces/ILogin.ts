export default interface IUser{
  id: number,
  username:string,
  role: string,
  email: string,
  password: string,
}

// trazendo da tabela  usuario

// criando uma  interface para oque sera mandado para o login e validado

export interface LoginResponse {
  user: {
    id: number,
    username:string,
    role: string,
    email: string,
    password: string,
  }
}
