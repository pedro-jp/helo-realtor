import { CreateIndicationService } from '../../services/Indication/CreateIndicationService';

class CreateIndicationController {
  async handle(req, res) {
    const createIndicationService = new CreateIndicationService();

    const { email, indicatedToId } = req.params;
    const indication = await createIndicationService.execute(
      email,
      indicatedToId
    );
    return res.json(indication);
  }
}

export { CreateIndicationController };
