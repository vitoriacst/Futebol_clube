import modelUsers from '../database/models/users.model';
import { ICredentials, IUser, IUserService } from '../interfaces/ILogin';
import JwtService from './Jwt.service';

// -|> implementando a interface IUserService , todos os metodos que ira ter interface IuserService tera que ter na classe

export default class UserService implements IUserService {
  static async findByEmail(email:string): Promise<IUser | null> {
    const user: IUser | null = await modelUsers.findOne({
      where: { email },
    });
    return user;
  }

  public login = async (credentials: ICredentials) => {
    const user: IUser | null = await UserService.findByEmail(credentials.email);
    if (!user) return null;
    const { id, email, role, username } = user;
    const token = await JwtService.generateToken(user);
    return { user: { id, email, role, username }, token };
  };
}
