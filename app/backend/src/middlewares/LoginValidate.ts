import { NextFunction, Request, Response } from 'express';
import ILogin from 'src/interfaces/ILogin';

export default class LoginValidate {
  public validate =
  async (req: Request, res:Response, next: NextFunction): Promise<(Response | void)> => {
    const { email, password } = req.body as ILogin;

    if (!email || email === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!password || password === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    return next();
  };
}
