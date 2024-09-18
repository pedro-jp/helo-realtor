import prismaClient from '../../prisma';

export class GetOfficesService {
  async execute() {
    const offices = await prismaClient.user.findMany({
      where: {
        planIsActive: true,
      },
      select: {
        office: true,
      },
    });
    offices.map((office) => {
      console.log('Escritorioss: ', office);
    });
    return offices;
  }
}
