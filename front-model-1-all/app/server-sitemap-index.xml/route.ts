import { getServerSideSitemapIndex } from 'next-sitemap';
import { OfficeType } from '../types';

// Função para buscar todas as URLs dinâmicas (exemplo do backend)
async function fetchOfficeUrls() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/offices`);
  const offices = await response.json();

  return offices.map((office: OfficeType) => `/e/${office.url}`);
}

export async function GET() {
  const officeUrls = await fetchOfficeUrls();

  // Gera o índice do sitemap
  return getServerSideSitemapIndex(
    officeUrls.map(
      (url: string) =>
        `${process.env.NEXT_PUBLIC_FRONT_URL}/sitemap-${url.replace('/e/', '')}.xml`
    )
  );
}

export const dynamic = 'force-dynamic'; // Garante que a geração será feita em tempo real
