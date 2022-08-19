import { Router } from 'express';
import UserController from '../controllers/userController';
import UserService from '../services/user.service';

const userService = new UserService();
const userController = new UserController(userService);

const user = Router();

user.post('/', userController.userLoginValidate);

export default user;

// -> a
