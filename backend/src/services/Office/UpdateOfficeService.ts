import prismaClient from '../../prisma';

interface OfficeRequest {
  name: string;
  ownerId: string;
  phone: string;
  location: string;
  description: string;
  email: string;
  officeId: string;
}

export class UpdateOfficeService {
  async execute({
    name,
    phone,
    location,
    description,
    email,
    officeId,
  }: OfficeRequest) {
    const office = await prismaClient.office.update({
      where: {
        id: officeId,
      },
      data: {
        name,
        phone,
        location,
        description,
        email,
      },
    });
    return office;
  }
}
