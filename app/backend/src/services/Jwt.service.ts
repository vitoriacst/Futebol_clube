import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/ILogin';

const secret: Secret = process.env.JWT_SECRET || 'secret';

export default class JwtService {
  static async generateToken(payload: JwtPayload): Promise<string> {
    const token: string = sign(payload, secret);
    return token;
  }

  static validateToken = async (token: string): Promise<string> => {
    const { data: { role } } = verify(token, secret) as IJwtPayload;
    return role;
  };
}
