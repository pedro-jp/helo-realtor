// app/api/sitemap/route.js
import { OfficeType } from '@/app/types';
import { api } from '../../services/api';

interface Offices {
  office: Office[];
}

interface Office extends OfficeType {}

export async function GET() {
  const baseUrl = process.env.NEXT_FRONT_URL;

  // Obtém a lista de escritórios da API
  const { data } = await api.get('/offices'); // Substitua pela sua chamada correta
  const offices = data;

  // Defina suas páginas estáticas
  const staticPages = [
    `${baseUrl}/`

    // Adicione outras rotas estáticas conforme necessário
  ];

  // Gerar páginas dinâmicas para os escritórios
  const dynamicPages = offices.map((office: Offices) => {
    return `${baseUrl}/e/${office.office[0].url}`; // Ajuste conforme a estrutura de URL dos escritórios
  });

  const imoveisPages = offices.flatMap((office: Offices) => {
    const imoveis = office.office[0].imoveis;
    return imoveis.map((imovel) => {
      return `${baseUrl}/e/${office.office[0].url}/${imovel.id}`; // URL dinâmica para cada imóvel
    });
  });

  // Gerar páginas dinâmicas para os imóveis dentro de cada escritório

  // Combina páginas estáticas e dinâmicas
  const allPages = [...staticPages, ...dynamicPages, ...imoveisPages];

  // Gera o sitemap no formato XML
  const sitemapXml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map((pageUrl) => {
          return `
          <url>
            <loc>${pageUrl}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
          </url>`;
        })
        .join('')}
    </urlset>
  `;

  // Remove quaisquer espaços extras ou quebras de linha antes do XML
  const cleanedXml = sitemapXml.trim();

  return new Response(cleanedXml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
