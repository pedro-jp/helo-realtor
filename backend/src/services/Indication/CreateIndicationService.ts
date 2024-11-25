import prismaClient from '../../prisma';

class CreateIndicationService {
  async execute(email: string, indicatedToId: string) {
    const indicatedById = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    const hasSentIndication = await prismaClient.indication.findFirst({
      where: {
        indicatedById: indicatedById.id,
      },
    });

    if (hasSentIndication) {
      return `Você já enviou uma indicação!`;
    }

    const indication = await prismaClient.indication.create({
      data: {
        indicatedById: indicatedById.id,
        indicatedToId,
      },
    });
    return indication;
  }
}

export { CreateIndicationService };
