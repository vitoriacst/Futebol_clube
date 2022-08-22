import Errors from '../middlewares/Errors';
import modelUsers from '../database/models/users.model';
import JwtService from './Jwt.service';
import { IUser } from '../interfaces/ILogin';
// -|> implementando a interface IUserService , todos os metodos que ira ter interface IuserService tera que ter na classe
// teste
export default class UserService {
  static async findByEmail(email:string) {
    // -|> procurando pelo email
    const user = await modelUsers.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('Not found user');
    }
    return user;
  }

  static login = async (credentials:{ email: string, password: string }) => {
    console.log(credentials);

    const userInformation: IUser | null = await UserService.findByEmail(credentials.email);
    if (!userInformation) throw new Errors(401, 'Incorrect email or password');
    // const { id, email, role, username } = userInformation;
    // -|> gerando o token apartir das informacoes do usuario
    const token = await JwtService.generateToken(userInformation);
    return token;
  };

  static getAllUsers = async () => {
    const model = await modelUsers.findAll();
    return model;
  };
}
