// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://imoveis.intg.com.br', // substitua com sua URL de produção

  generateRobotsTxt: true, // caso queira gerar um arquivo robots.txt também
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 50000,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://imoveis.intg.com.br/api/sitemap' // URL do sitemap gerado
    ]
  }
};
