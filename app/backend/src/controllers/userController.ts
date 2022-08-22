import { Request, Response } from 'express';
import LoginValidate from '../services/LoginValidate';
import UserService from '../services/user.service';
// import { IUserService } from '../interfaces/ILogin';

export default class UserController {
  // private _userService: IUserService;
  // constructor(userService:IUserService) {
  //   this.login = this.login.bind(this);
  //   this._userService = userService;
  // }

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
}
