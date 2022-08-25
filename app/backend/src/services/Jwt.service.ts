import * as dotenv from 'dotenv';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/ILogin';

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

export default class JwtService {
  static async generateToken(payload: JwtPayload): Promise<string> {
    const token: string = sign(payload, secret);
    return token;
  }

  static validateToken = async (token: string) => {
    const role = verify(token, secret) as IJwtPayload;
    return role.role;
  };
}
