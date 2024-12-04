module.exports = {
  siteUrl: 'https://imoveis.intg.com.br',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'], // Excluir se necessário
  robotsTxtOptions: {
    additionalSitemaps: ['https://imoveis.intg.com.br/sitemap-index.xml'],
    policies: [{ userAgent: '*', allow: '/' }],
  },
  // Adiciona uma função para páginas dinâmicas
  transform: async (config, path) => {
    // Adicionar configurações customizadas para cada rota
    return {
      loc: path, // URL da página
      changefreq: 'daily', // Frequência de atualização
      priority: 0.7, // Prioridade no sitemap
      lastmod: new Date().toISOString(), // Última modificação
    };
  },
};
