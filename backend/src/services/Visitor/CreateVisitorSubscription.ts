import { PrismaClient } from '@prisma/client';
import { Imovel, VisitorSubscription } from '../../interfaces';

export class CreateVisitorSubscription {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute({ officeId, email, name }: VisitorSubscription) {
    const existingVisitor = await this.prisma.visitor_Subscription.findUnique({
      where: {
        email,
        officeId,
      },
    });

    if (!existingVisitor) {
      const visitor = await this.prisma.visitor_Subscription.create({
        data: {
          officeId,
          email,
          name,
        },
      });

      return visitor;
    }
  }
}
