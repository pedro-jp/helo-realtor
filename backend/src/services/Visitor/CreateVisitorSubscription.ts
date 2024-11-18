import { PrismaClient } from '@prisma/client';
import { Imovel, VisitorSubscription } from '../../interfaces';

export class CreateVisitorSubscription {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async execute({ officeId, email, name }: VisitorSubscription) {
    const existingVisitor = await this.prisma.visitor_Subscription.findMany({
      where: {
        AND: [{ email }, { officeId }],
      },
    });

    // Verificar se já existe um visitante
    if (existingVisitor.length === 0) {
      try {
        const visitor = await this.prisma.visitor_Subscription.create({
          data: {
            officeId,
            email,
            name,
          },
        });
        console.log(visitor);
        return visitor;
      } catch (error) {
        console.error('Error creating visitor:', error);
      }
    } else {
      console.log('Visitor already exists');
    }
  }
}
