import modelUsers from '../database/models/users.model';

class LoginService {
  static async login(email: string, password: string) {
    const sucessCase = await modelUsers.findOne({ where: { email, password } });
    // vai procurar o email e senha
    // teste
    return sucessCase;
  }
}

export default LoginService;
