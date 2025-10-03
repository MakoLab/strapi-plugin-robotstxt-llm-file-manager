import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    const { configKey } = ctx.params;
    ctx.body = strapi.plugin('links').service('service').getConfig(configKey);
  },
});

export default controller;
