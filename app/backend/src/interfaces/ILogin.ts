// -|> trazendo da tabela  usuario

export default interface IUser{
  id: number,
  username:string,
  role: string,
  email: string,
  password: string,
}

// -|> criando uma  interface para oque sera mandado para o login e validado

export interface ILoginResponse {
  user: {
    id: number,
    username:string,
    role: string,
    email: string,
    password: string,
  }
}

// -|> interface para colher as credencias cobradas no login

export interface ICredentials{
  email: string;
  password: string;
}
