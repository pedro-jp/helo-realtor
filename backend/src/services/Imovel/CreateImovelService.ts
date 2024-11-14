import { PrismaClient } from '@prisma/client';
import { Imovel } from '../../interfaces';
import { sendEmail } from '../../utils/SendGrid';

export class CreateImovelService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute({
    name,
    description,
    price,
    local,
    quartos,
    banheiros,
    area,
    garagem,
    active,
    categoryId,
    ownerId,
    officeId,
    realtorId,
    latitude,
    longitude,
    marker,
    transaction,
  }: Imovel) {
    const imovel = await this.prisma.imovel.create({
      data: {
        name,
        description,
        local,
        price,
        quartos,
        banheiros,
        area,
        garagem,
        active,
        categoryId,
        ownerId,
        officeId,
        realtorId,
        latitude,
        longitude,
        marker,
        transaction,
      },
    });

    const visitors = await this.prisma.visitor_Subscription.findMany({
      where: {
        officeId: officeId,
      },
    });

    const office = await this.prisma.office.findUnique({
      where: {
        id: officeId,
      },
    });

    await Promise.all(
      visitors.map(async (visitor) => {
        try {
          const result = await sendEmail({
            to: visitor.email,
            from: 'joaopedroc035@gmail.com',
            subject: 'Novo Imóvel Cadastrado',
            text: `Um novo imóvel foi cadastrado na Imobiliaria ${office?.name}. Entre em contato com a imobiliária para mais detalhes.`,
            html: `
            <h1>Um novo imóvel foi cadastrado na Imobiliaria ${office?.name}.</h1>
              <p>Imobiliária: ${office?.name}</p>
              <p>Imóvel: ${imovel.name}</p>
              <p>Local: ${imovel.local}</p>
              <p>Quartos: ${imovel.quartos}</p>
              <p>Banheiros: ${imovel.banheiros}</p>
              <p>Área: ${imovel.area}</p>
              <picture style="width: 100px; height: 100px;"><img style="width: 100px; height: 100px;, object-fit: cover" src='https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600' alt="Imagem do imóvel"></picture><br>
              <h2>Veja o imóvel aqui:</h2>
              <a href='https://imoveis.intg.com.br/${office?.url}/${imovel.id}'>Clique aqui</a>
            `,
          });
        } catch (error) {
          console.error(`Erro ao enviar email para ${visitor.email}:`, error);
        }
      })
    );

    return imovel;
  }
}
