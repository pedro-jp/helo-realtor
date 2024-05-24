import prismaClient from '../../prisma';

interface OfficeRequest {
  name: string;
  ownerId: string;
  phone: string;
  location: string;
  description: string;
}

export class UpdateOfficeService {
  async execute({
    name,
    ownerId,
    phone,
    location,
    description,
  }: OfficeRequest) {
    const office = await prismaClient.office.update({
      where: {
        ownerId,
      },
      data: {
        name,
        phone,
        location,
        description,
      },
    });
    return office;
  }
}
