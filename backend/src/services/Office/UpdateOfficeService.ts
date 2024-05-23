import prismaClient from '../../prisma';

interface OfficeRequest {
  name: string;
  ownerId: string;
  phones: string;
  location: string;
  description: string;
}

export class UpdateOfficeService {
  async execute({
    name,
    ownerId,
    phones,
    location,
    description,
  }: OfficeRequest) {
    const office = await prismaClient.office.update({
      where: {
        ownerId,
      },
      data: {
        name,
        phones,
        location,
        description,
      },
    });
    return office;
  }
}
