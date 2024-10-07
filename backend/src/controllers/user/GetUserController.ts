import { GetUSerService } from '../../services/user/GetUserService';

class GetUserController {
  async handle(req: any, res: any) {
    const { email } = req.params;

    const getUserService = new GetUSerService();
    const user = await getUserService.execute({ email });
    return res.json(user);
  }
}
export { GetUserController };
