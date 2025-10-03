import type { Core } from '@strapi/strapi';
import permissions from './permissions';

const bootstrap = async ({ strapi }: { strapi: Core.Strapi }) => {
  const permissionService = strapi.admin.services.permission;

  if (permissionService) {
    permissions.forEach((permission) => {
      permissionService.actionProvider.register(permission);
    });
  }
};

export default bootstrap;
