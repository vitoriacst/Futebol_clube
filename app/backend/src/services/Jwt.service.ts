import { sign } from 'jsonwebtoken';
import { IUser } from '../interfaces/ILogin';

const tokenSecret = process.env.JWT_SECRET || 'secret';

export default class JwtService {
  static async generateToken(credentials: IUser): Promise<string> {
    const { password, ...data } = credentials;
    const token: string = sign({ data }, tokenSecret, { expiresIn: '5d' });
    return token;
  }
}
