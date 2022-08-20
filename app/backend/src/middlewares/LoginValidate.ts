import * as Joi from 'joi';
import { ICredentials } from '../interfaces/ILogin';
import Errors from './Errors';

export default class LoginValidate {
  static validateLogin = async (credentials : ICredentials): Promise<ICredentials> => {
    const message = 'All fields must be filled';
    const usersInformations = Joi.object({
      email: Joi.string().email().required().messages({
        'string.empty': message,
      }),
      password: Joi.string().min(6).required(),
    });
    const { error } = usersInformations.validate(credentials);
    if (error?.message.includes('must be filled')) {
      throw new Errors(401, error.message);
      // -> Erros vem diretamente do MiddleWare de erro
    }
    if (error?.message.includes('length')) {
      throw new Errors(401, 'Incorrect email or password');
    }
    return credentials;
  };
}

// -|> realizando a validacao por meio da interface de credenciais criada
