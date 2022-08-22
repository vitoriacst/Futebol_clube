import * as Joi from 'joi';
import { ICredentials } from '../interfaces/ILogin';
import Errors from '../middlewares/Errors';

export default class JoiService {
  static validateLogin = async (credentials: ICredentials): Promise<ICredentials> => {
    const userInformation = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    const { error } = userInformation.validate(credentials);
    if (error?.message.includes('empty')) {
      throw new Errors(400, 'All fields must be filled');
    }
    if (error?.message.includes('required')) {
      throw new Errors(400, 'All fields must be filled');
    }
    if (error?.message.includes('must be filled')) {
      throw new Errors(400, error.message);
    }
    // tratando o tamanho dos campos inseridos
    if (error?.message.includes('length')) {
      throw new Errors(401, 'Incorrect email or password');
    }
    return credentials;
  };
}
