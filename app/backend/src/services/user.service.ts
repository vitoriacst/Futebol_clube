import modelUsers from '../database/models/users.model';
import { ICredentials, IUser } from '../interfaces/ILogin';
import JwtService from './Jwt.service';

// -|> implementando a interface IUserService , todos os metodos que ira ter interface IuserService tera que ter na classe

export default class UserService {
  static async findByEmail(email:string): Promise<IUser | null> {
    // -|> procurando pelo email
    const user: IUser | null = await modelUsers.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('Not found user');
    }
    return user;
  }

  public login = async (credentials: ICredentials): Promise<string> => {
    const userInformation: IUser | null = await UserService.findByEmail(credentials.email);
    if (!userInformation) throw new Error('');
    // const { id, email, role, username } = userInformation;
    // -|> gerando o token apartir das informacoes do usuario
    const token = await JwtService.generateToken(userInformation);
    return token;
  };
}
