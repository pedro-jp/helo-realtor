import { Request, Response } from 'express';
import { CreateVisitorSubscription } from '../../services/Visitor/CreateVisitorSubscription';

export class CreateVisitorSubscriptionController {
  async handle(req: Request, res: Response) {
    const { email, name, officeId } = req.body;

    const createVisitorSubscription = new CreateVisitorSubscription();

    const visitor = await createVisitorSubscription.execute({
      officeId,
      name,
      email,
    });

    return res.json(visitor);
  }
}
