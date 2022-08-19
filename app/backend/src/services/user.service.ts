import modelUsers from '../database/models/users.model';
import { ICredentials, IUser, IUserService } from '../interfaces/ILogin';
import JwtService from './Jwt.service';

// -|> implementando a interface IUserService , todos os metodos que ira ter interface IuserService tera que ter na classe

export default class UserService implements IUserService {
  static async findEMail(email:string):Promise<IUser | null > {
    const emailUser: IUser | null = await modelUsers.findOne({
      where: { email },
    });
    return emailUser;
  }
}

public UserLogin = async (credentials: ICredentials) => {
  const userInformation : IUser | null = await UserService.findEMail(credentials.email);
  if(!userInformation) return null;
  const { id, email, role, username } = userInformation
  const token = await JwtService.generateToken(userInformation);
}
