import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      city,
      state,
      country,
      address,
      postal_code,
      complement = ''
    } = req.body;

    const creteUserService = new CreateUserService();

    const user = await creteUserService.execute({
      name,
      email,
      password,
      city,
      state,
      country,
      address,
      postal_code,
      complement
    });

    return res.json(user);
  }
}

export { CreateUserController };
