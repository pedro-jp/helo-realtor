import Stripe from 'stripe';
import prismaClient from '../../prisma';

import { hash } from 'bcryptjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error('Email incorrect');
    }
    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExist) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const customer = await stripe.customers.create({
      email: email,
      name: name,
      shipping: {
        address: {
          city: 'Brothers',
          country: 'US',
          line1: '27 Fredrick Ave',
          postal_code: '97712',
          state: 'CA',
        },
        name,
      },
      address: {
        city: 'Brothers',
        country: 'US',
        line1: '27 Fredrick Ave',
        postal_code: '97712',
        state: 'CA',
      },
    });

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        name: true,
        id: true,
        email: true,
      },
    });

    return { user, customer };
  }
}
export { CreateUserService };
