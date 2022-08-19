import Joi = require('joi');
import { ICredentials } from '../interfaces/ILogin';

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
    }
  };
}

// -|> realizando a validacao por meio da interface de credenciais criada
