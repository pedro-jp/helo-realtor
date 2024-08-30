import prismaClient from '../../prisma';

interface OfficeRequest {
  name: string;
  ownerId: string;
  phone: string;
  address: string;
  address_city: string;
  description: string;
  email: string;
  officeId: string;
}

export class UpdateOfficeService {
  async execute({
    name,
    ownerId,
    phone,
    description,
    address,
    address_city,
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
        address,
        address_city,
        description,
        email,
      },
    });
    return office;
  }
}
