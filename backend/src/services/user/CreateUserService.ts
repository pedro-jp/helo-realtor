import Stripe from 'stripe';
import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

interface UserRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  country: string;
  address: string;
  postal_code: string;
  complement: string;
}

class CreateUserService {
  async execute({
    name,
    email,
    password,
    city,
    state,
    country,
    address,
    postal_code,
    complement
  }: UserRequest) {
    if (!email) {
      throw new Error('Email incorrect');
    }

    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if (userAlreadyExist) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    let customer;

    // Verifica se o usuário já existe no Stripe
    const stripeCustomerList = await stripe.customers.list({
      email: email,
      limit: 1 // Limita a busca a um resultado
    });

    if (stripeCustomerList.data.length > 0) {
      // Cliente já existe no Stripe
      customer = stripeCustomerList.data[0];
      stripe.customers.update(customer.id, {
        name,
        email,
        preferred_locales: ['pt-BR'],
        shipping: {
          address: {
            line1: address,
            line2: complement,
            city,
            state,
            postal_code,
            country: 'BR'
          },
          name
        },
        address: {
          line1: address,
          line2: complement,
          city,
          state,
          postal_code,
          country: 'BR'
        }
      });
      console.log('Cliente encontrado no e atualiado:', customer);
    } else {
      // Caso contrário, cria um novo cliente no Stripe
      customer = await stripe.customers.create({
        email: email,
        name: name,
        preferred_locales: ['pt-BR'],
        shipping: {
          address: {
            line1: address,
            line2: complement,
            city,
            state,
            postal_code,
            country: 'BR'
          },
          name
        },
        address: {
          line1: address,
          line2: complement,
          city,
          state,
          postal_code,
          country: 'BR'
        }
      });

      console.log('Cliente criado no Stripe:', customer.id);
    }

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        city,
        state,
        country,
        address,
        postal_code,
        complement,
        stripeCustomerId: customer.id // Salva o stripeCustomerId no banco de dados
      },
      select: {
        name: true,
        id: true,
        email: true
      }
    });

    console.log({ customer, user });
    return { user, customer };
  }
}

export { CreateUserService };
