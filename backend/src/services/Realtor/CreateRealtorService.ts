import prismaClient from '../../prisma';

interface RealtorRequest {
  name: string;
  email: string;
  phone: string;
  creci: string;
  whatsapp_message: string;
  officeId: string;
}

export class CreateRealtorService {
  async execute({
    name,
    email,
    phone,
    creci,
    officeId,
    whatsapp_message,
  }: RealtorRequest) {
    // Verifica se o escritório existe antes de criar o Realtor
    const officeExists = await prismaClient.office.findUnique({
      where: { id: officeId },
    });

    if (!officeExists) {
      throw new Error('Office not found');
    }

    const realtor = await prismaClient.realtor.create({
      data: {
        name,
        email,
        phone,
        creci,
        whatsapp_message,
        officeId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        creci: true,
        whatsapp_message: true,
        officeId: true,
      },
    });

    return realtor;
  }
}
