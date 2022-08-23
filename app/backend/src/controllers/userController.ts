import { Request, Response } from 'express';
import LoginValidate from '../services/LoginValidate';
import UserService from '../services/user.service';

export default class UserController {
  static async login(request: Request, response: Response) {
    await LoginValidate.validateLogin(request.body);
    // puxando do middleware de validacao
    const token = await UserService.login(request.body);
    // validando a existencia do token e retornando o status 200, caso o login seja efetuado com sucesso;
    response.status(200).json({ token });
  }

  static async getAllUsers(_req:Request, res: Response) {
    const user = await UserService.getAllUsers();
    return res.status(200).json(user);
  }

  static validateUser = async (request: Request, response: Response): Promise<void> => {
    const { authorization } = request.headers;
    if (!authorization) throw new Error('Invalid Token');
    const role = await UserService.validateUser(authorization);
    response.status(200).json({ role });
  };
}
