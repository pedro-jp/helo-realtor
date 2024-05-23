import prismaClient from '../../prisma';

interface OfficeRequest {
  name: string;
  ownerId: string;
  phones: string;
  location: string;
  description: string;
}

export class CreateOfficeService {
  async execute({
    name,
    ownerId,
    phones,
    location,
    description,
  }: OfficeRequest) {
    const office = await prismaClient.office.create({
      data: {
        name,
        ownerId,
        phones,
        location,
        description,
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
