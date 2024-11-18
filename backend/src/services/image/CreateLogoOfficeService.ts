import prismaClient from '../../prisma';

interface OfficeRequest {
  officeId: string;
  url: string;
}

export class CreateLogoOfficeService {
  async execute({ officeId, url }: OfficeRequest) {
    const product = await prismaClient.office_Logo.create({
      data: {
        officeId,
        url,
      },
      select: {
        officeId: true,
        url: true,
      },
    });
    return product;
  }
}
