module.exports = {
  siteUrl: 'https://imoveis.intg.com.br',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://imoveis.intg.com.br/sitemap-index.xml'],
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
