import { GetServerSideProps } from 'next';
import { api } from './services/api';
import { OfficesType } from './types';
import fs from 'fs';

export const getServerSideProps = async ({ res }: any) => {
  const r = res;
  const baseUrl = process.env.NEXT_FRONT_URL;
  const offices: OfficesType = await api.get('/offices');

  const staticPages = fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return !['_app', '_document', '_error', 'api'].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });
  console.log(staticPages);

  return {
    props: {
      offices,
      staticPages
    }
  };
};

export default function Sitemap() {}
