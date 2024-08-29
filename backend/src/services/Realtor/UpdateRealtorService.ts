import prismaClient from '../../prisma';

interface RealtorRequest {
  name: string;
  email: string;
  phone: string;
  creci: string;
  whatsapp_message: string;
  realtorId: string;
  officeId: string;
}

export default class UpdateRealtorService {
  async execute({
    name,
    email,
    phone,
    creci,
    realtorId,
    officeId,
  }: RealtorRequest) {
    const realtor = await prismaClient.realtor.update({
      where: {
        id: realtorId,
      },
      data: {
        name,
        email,
        phone,
        creci,
        officeId,
      },
    });
    return realtor;
  }
}
