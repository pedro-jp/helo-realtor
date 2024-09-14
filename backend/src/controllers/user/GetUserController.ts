import { GetUSerService } from '../../services/user/GetUserService';

class GetUserController {
  async handle(req: any, res: any) {
    const { id } = req.params;

    const getUserService = new GetUSerService();
    const user = await getUserService.execute({ id });
    return res.json(user);
  }
}
export { GetUserController };
