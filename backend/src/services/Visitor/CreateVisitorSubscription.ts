import { PrismaClient } from '@prisma/client';
import { Imovel, VisitorSubscription } from '../../interfaces';

export class CreateVisitorSubscription {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute({ officeId, email, name }: VisitorSubscription) {
    const imovel = await this.prisma.visitor_Subscription.create({
      data: {
        officeId,

        name,
        email,
      },
    });

    return imovel;
  }
}
