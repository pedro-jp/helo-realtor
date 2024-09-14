import prismaClient from '../../prisma';

class GetUSerService {
  async execute({ id }) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    console.log(user);
    return user;
  }
}
export { GetUSerService };
