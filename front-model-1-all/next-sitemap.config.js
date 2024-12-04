module.exports = {
  siteUrl: 'https://imoveis.intg.com.br',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'], // Excluir se necessário
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://imoveis.intg.com.br/sitemap-index.xml', // URL do sitemap principal
    ],
    policies: [{ userAgent: '*', allow: '/' }],
  },
  sitemapSize: 5000, // Número de URLs por sitemap
  // Configurações do sitemap dinâmico
  transform: async (config, path) => {
    return {
      loc: path, // URL da página
      changefreq: 'daily', // Frequência de atualização
      priority: 0.7, // Prioridade no sitemap
      lastmod: new Date().toISOString(), // Última modificação
    };
  },
  // Garantir que o sitemap-index.xml seja gerado corretamente
  sitemapIndex: 'https://imoveis.intg.com.br/sitemap-index.xml', // URL do índice
};
