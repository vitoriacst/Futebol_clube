import { Request, Response } from 'express';
import { IUserService } from '../interfaces/ILogin';
import LoginValidate from '../middlewares/LoginValidate';

export default class UserController {
  constructor(private _userService: IUserService) {
    this.userLoginValidate = this.userLoginValidate.bind(this);
  }

  async userLoginValidate(response: Response, request: Request): Promise<void> {
    await LoginValidate.validateLogin(request.body);
    // puxando do middleware de validacao
    const result = await this._userService.login(request.body);
    // validando a existencia do token e retornando o status 200, caso o login seja efetuado com sucesso;
    response.status(200).json({ token: result?.token });
  }
}
