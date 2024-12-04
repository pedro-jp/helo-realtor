import { getServerSideSitemapIndex } from 'next-sitemap';

// Função para buscar todas as URLs dinâmicas (exemplo do backend)
async function fetchOfficeUrls() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/offices`);
  const offices = await response.json();

  return offices.map((office) => `/e/${office.url}`);
}

export async function GET() {
  const officeUrls = await fetchOfficeUrls();

  return getServerSideSitemapIndex({
    // Todas as rotas dinâmicas devem ser incluídas aqui
    sitemaps: [
      ...officeUrls.map((url) => `${process.env.NEXT_PUBLIC_FRONT_URL}${url}`),
    ],
  });
}

export const dynamic = 'force-dynamic'; // Garante que a geração será feita em tempo real
