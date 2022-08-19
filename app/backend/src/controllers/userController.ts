import { Request, Response } from 'express';
import { IUserService } from '../interfaces/ILogin';
import LoginValidate from '../middlewares/LoginValidate';

export default class UserController {
  constructor(private _userService: IUserService) {}
  async UserLoginValidate(res: Response, req: Request): Promise<void> {
    await LoginValidate.validateLogin(req.body);
    // puxando do middleware de validacao
    const response = await this._userService.login(req.body);
    // validando a existencia do token e retornando o status 200, caso o login seja efetuado com sucesso;
    res.status(200).json({ token: response?.token });
  }
}
