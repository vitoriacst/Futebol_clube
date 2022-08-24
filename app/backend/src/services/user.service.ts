import modelUsers from '../database/models/users.model';
import Errors from '../middlewares/Errors';
import EncryptService from './encrypt.service';
import JwtService from './Jwt.service';
// -|> implementando a interface IUserService , todos os metodos que ira ter interface IuserService tera que ter na classe
// teste
export default class UserService {
  static async findByEmail(email:string) {
    // -|> procurando pelo email
    const user = await modelUsers.findOne({
      where: { email },
    });

    return user;
  }

  static login = async (credentials:{ email: string, password: string }) => {
    const userInformation = await UserService.findByEmail(credentials.email);
    // => validacao do email e senha
    if (!userInformation) {
      throw new Errors(401, 'Incorrect email or password');
    }

    if (!EncryptService.validatePassword(credentials.password, userInformation.password)) {
      throw new Errors(401, 'Incorrect email or password');
    }

    // -|> gerando o token apartir das informacoes do usuario
    const { id, role } = userInformation;
    const payload = { id, role };

    const token = await JwtService.generateToken(payload);
    return token;
  };

  static getAllUsers = async () => {
    const model = await modelUsers.findAll();
    return model;
  };

  // -|> criando um metodo para a validacao
  static validateUser = async (token: string) => {
    const check = JwtService.validateToken(token);
    return check;
  };
}
