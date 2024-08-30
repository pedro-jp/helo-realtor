import prismaClient from '../../prisma';

interface OfficeRequest {
  name: string;
  ownerId: string;
  phone: string;
  address: string;
  address_city: string;
  description: string;
  email: string;
}

export class CreateOfficeService {
  async execute({
    name,
    ownerId,
    phone,
    description,
    address,
    address_city,
    email,
  }: OfficeRequest) {
    const office = await prismaClient.office.create({
      data: {
        name,
        ownerId,
        phone,
        description,
        address,
        address_city,
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
