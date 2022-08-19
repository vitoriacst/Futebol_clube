import { Router } from 'express';
import UserController from '../controllers/userController';

const user = Router();

user.post('/', (request, response) => UserController.UserLoginValidate(request, response));

export default user;
