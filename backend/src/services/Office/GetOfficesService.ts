import prismaClient from '../../prisma';

export class GetOfficesService {
  async execute() {
    const offices = await prismaClient.office.findMany();
    console.log(offices);
    return offices;
  }
}
