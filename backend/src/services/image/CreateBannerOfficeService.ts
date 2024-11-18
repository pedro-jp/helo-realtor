import prismaClient from '../../prisma';

interface OfficeRequest {
  officeId: string;
  url: string;
}

export class CreateBannerOfficeService {
  async execute({ officeId, url }: OfficeRequest) {
    const product = await prismaClient.office_Banner.create({
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
