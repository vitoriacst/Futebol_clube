import { Router, Request, Response } from 'express';
import LoginValidate from '../middlewares/LoginValidate';

const LoginRouter = Router();
const validation = new LoginValidate();
 LoginRouter.post('/', validation.validate, async (req: Request, res: Response) => {
   // implementar o controller
});

export default = LoginRouter;
