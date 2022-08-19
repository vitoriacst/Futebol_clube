import Joi = require('joi');
import { ICredentials } from '../interfaces/ILogin';

export default class LoginValidate {
  static validateLogin = async (credentials : ICredentials): Promise<ICredentials> => {
    const message = 'All fields must be filled';
    const validate = Joi.object({
      email: Joi.string().email().required().messages({
        'string.empty': message,
      }),
    });
  };
}

// -|> realizando a validacao por meio da interface de credenciais criada
