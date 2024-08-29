import prismaClient from '../../prisma';

interface OfficeRequest {
  name: string;
  ownerId: string;
  phone: string;
  location: string;
  description: string;
  email: string;
}

export class CreateOfficeService {
  async execute({
    name,
    ownerId,
    phone,
    location,
    description,
    email,
  }: OfficeRequest) {
    const office = await prismaClient.office.create({
      data: {
        name,
        ownerId,
        phone,
        location,
        description,
        email,
      },
      select: {
        id: true,
        ownerId: true,
        banner_image: true,
      },
    });
    return office;
  }
}
