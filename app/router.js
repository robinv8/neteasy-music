'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/jarvis', controller.home.play);
  router.post('/jarvis2', controller.home.play2);
};
