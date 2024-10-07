import prismaClient from '../../prisma';

class GetUSerService {
  async execute({ email }) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    console.log(user);
    return user;
  }
}
export { GetUSerService };
