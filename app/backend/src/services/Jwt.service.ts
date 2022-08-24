import * as dotenv from 'dotenv';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/ILogin';
import Errors from '../middlewares/Errors';

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

export default class JwtService {
  static async generateToken(payload: JwtPayload): Promise<string> {
    const token: string = sign(payload, secret);
    return token;
  }

  static validateToken = async (token: string) => {
    try {
      const { data: { role } } = verify(token, secret) as IJwtPayload;
      if (!role) throw new Errors(401, 'Token must be a valid token');
      return role;
    } catch (error) {
      throw new Errors(401, 'Token must be a valid token');
    }
  };
}
