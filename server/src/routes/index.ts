export default [
  {
    method: 'GET',
    path: '/config/:configKey',
    handler: 'controller.index',
    config: { policies: [] },
  },
];
