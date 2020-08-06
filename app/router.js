'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// app/router.js
module.exports = app => {
  // eslint-disable-next-line no-unused-vars
  const { middlewares: { oauth, nslOauth, miniOauth, subOauth }, router, controller } = app;
  // router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/user/getuser', controller.user.getUserById);
  router.get('/user/nsl/getUser', controller.nsl.user.getUser);

  // 门店
  router.post('/api/nsl/store/create', controller.nsl.store.postAddStore);
  router.get('/api/nsl/store/detail/list', controller.nsl.store.getStores);
  router.get('/api/nsl/store/list', controller.nsl.store.getStoreList);
  router.post('/api/nsl/store/channel/create', controller.nsl.store.createChannel);

  // 赠品
  router.post('/api/nsl/gift/create', controller.nsl.gift.postAddGift);
  router.get('/api/nsl/gift/list', controller.nsl.gift.getGiftList);
  router.get('/api/nsl/store/channel/list', controller.nsl.gift.getChannelList);

  router.post('/api/nsl/relation/add', controller.nsl.relation.addGiftToStore);
};
