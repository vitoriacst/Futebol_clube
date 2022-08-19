import { IUserService } from '../interfaces/ILogin';

export default class UserController {
  constructor(private _userService: IUserService) {}
}
