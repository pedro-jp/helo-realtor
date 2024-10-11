import prismaClient from '../../prisma';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface CreateCheckoutSessionParams {
  email: string;
  priceId: string;
}

export const checkoutService = {
  async createCheckoutSession({ email, priceId }: CreateCheckoutSessionParams) {
    try {
      // Verifica se o cliente já existe no banco de dados
      const customer = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (!customer) {
        throw new Error('Cliente não encontrado no banco de dados.');
      }

      // Busca o cliente no Stripe usando a lista de clientes
      const customers = await stripe.customers.list({
        email: email, // Isso busca todos os clientes, mas filtra pelo email
      });

      const customerStripe = customers.data.find(
        (cust: { email: string }) => cust.email === email
      );

      if (!customerStripe) {
        throw new Error('Cliente não encontrado no Stripe.');
      }

      const customerId = customerStripe.id;

      // Cria a sessão de checkout no Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        customer: customerId, // Usa o cliente existente
        success_url: `${process.env.FRONT_ALL_URL}/plans`,
        cancel_url: `${process.env.FRONT_ALL_URL}/plans`,
      });

      return session.url; // Retorna a URL da sessão
    } catch (error) {
      console.log(error);
      throw new Error(error.message); // Retorna apenas a mensagem de erro
    }
  },
};
