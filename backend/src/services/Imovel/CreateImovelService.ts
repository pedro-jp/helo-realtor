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
    // Passo 1: Criar o imóvel
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

    // Passo 2: Buscar os visitantes e os dados adicionais do escritório e do imóvel

    // Passo 3: Agendar envio de e-mails após 2 minutos
    setTimeout(async () => {
      const [visitors, office, imovelWithImages] = await Promise.all([
        this.prisma.visitor_Subscription.findMany({
          where: {
            officeId: officeId,
          },
        }),
        this.prisma.office.findUnique({
          where: {
            id: officeId,
          },
          include: {
            Office_Logo: true,
          },
        }),
        this.prisma.imovel.findUnique({
          where: {
            id: imovel.id,
          },
          include: {
            images: true,
          },
        }),
      ]);
      try {
        await Promise.all(
          visitors.map(async (visitor) => {
            try {
              await sendEmail({
                to: visitor.email,
                from: 'contato@intg.com.br',
                subject: 'Novo Imóvel Cadastrado.',
                text: `Um novo imóvel foi cadastrado na Imobiliária ${office?.name}. Entre em contato com a imobiliária para mais detalhes.`,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
                  <div style="background: linear-gradient(90deg, #f43b47, #453a94); padding: 20px; text-align: center;">
                    <img src="${
                      office?.Office_Logo[office.logo_index]?.url
                    }" alt="Logo da Imobiliária" style="width: 50px; margin-bottom: 10px;">
                    <h1 style="color: white; font-size: 24px; margin: 0;">${
                      office?.name
                    }</h1>
                  </div>
                  <div style="padding: 20px; text-align: center;">
                    <h2 style="font-size: 20px; color: #333;">Novo imóvel cadastrado!</h2>
                    <p style="font-size: 16px; color: #555;">Confira os detalhes abaixo:</p>
                    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 10px; text-align: left; margin: 20px auto; max-width: 300px;">
                      <p><strong>Imóvel:</strong> ${imovel.name}</p>
                      <p><strong>Local:</strong> ${imovel.local}</p>
                      <p><strong>Quartos:</strong> ${imovel.quartos}</p>
                      <p><strong>Banheiros:</strong> ${imovel.banheiros}</p>
                      <p><strong>Área:</strong> ${imovel.area}</p>
                    </div>
                    <img src="${
                      imovelWithImages?.images[0]?.url
                    }" alt="Imagem do imóvel" style="width: 100%; max-width: 300px; border-radius: 10px; object-fit: cover; margin: 10px 0;">
                    <a href="https://imoveis.intg.com.br/${office?.url}/${
                  imovel.id
                }" style="display: inline-block; background-color: #f43b47; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Ver Imóvel</a>
                  </div>
                </div>
                `,
              });

              console.log(`E-mail enviado para ${visitor.email}`);
            } catch (error) {
              console.error(
                `Erro ao enviar email para ${visitor.email}:`,
                error
              );
            }
          })
        );
      } catch (error) {
        console.error('Erro ao enviar e-mails para os visitantes:', error);
      }
    }, 0.5 * 60 * 1000); // 2 minutos em milissegundos

    return imovel;
  }
}
