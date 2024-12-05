import prismaClient from '../../prisma';

export class GetOfficesService {
  async execute() {
    const offices = await prismaClient.user.findMany({
      where: {
        planIsActive: true
      },

      include: {
        office: {
          include: {
            banner_image: true,
            Office_Logo: true,
            realtors: true,
            imoveis: true,
            owner: {
              select: {
                categories: true
              }
            }
          }
        }
      }
    });
    offices.map((office) => {
      console.log('Escritorioss: ', office);
    });
    return offices;
  }
}
