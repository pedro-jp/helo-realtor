import prismaClient from '../../prisma';

class GetUSerService {
  async execute({ email }) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
      include: {
        office: true,
        categories: true,
        indicationsMade: true,
        indicationsReceived: true,
      },
    });
    return user;
  }
}
export { GetUSerService };
