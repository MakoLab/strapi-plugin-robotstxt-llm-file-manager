import type { Core } from '@strapi/strapi';

const config = ({ strapi }: { strapi: Core.Strapi }) => ({
  getConfig(key: string = 'env') {
    return strapi.plugin('links').config(key) ?? {};
  },
});

export default config;
