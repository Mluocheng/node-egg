'use strict';

const Controller = require('egg').Controller;

class StoreController extends Controller {
  // 获取门店列表
  async getStores() {
    const { ctx } = this;
    const { pageSize, pageNo } = ctx.query;
    try {
      const { stores, total } = await this.ctx.service.nsl.store.getStores({ pageSize, pageNo });
      ctx.body = ctx.wrapper({
        list: stores,
        total,
        params: { pageSize: 'number', pageNo: 'number', keyword: 'string' },
        msg: '入参, 带*为必填pageSize默认为10，pageNo为 1 keyword为空',
      });
    } catch (e) {
      ctx.body = ctx.wrapperIot({}, 203, e);
    }
  }

  async getStoreList() {
    const { ctx } = this;
    const { pageSize, pageNo } = ctx.query;
    try {
      const { stores, total } = await this.ctx.service.nsl.store.getStores({ pageSize, pageNo });
      ctx.body = ctx.wrapper({
        list: stores,
        total,
        params: { pageSize: 'number', pageNo: 'number', keyword: 'string' },
        msg: '入参, 带*为必填pageSize默认为10，pageNo为 1 keyword为空',
      });
    } catch (e) {
      ctx.body = ctx.wrapperIot({}, 203, e);
    }
  }

  async postAddStore() {
    const { ctx, service } = this;
    const { guiderName, storeAddress, storeBuys, storeGuide, storeId, storeName } = ctx.request.body;
    // console.log(ctx.request.body, 'ctx.request.body ==== >>>');
    // 添加门店
    try {
      const stores = await service.nsl.store.postAddStore({ guiderName, storeAddress, storeBuys, storeGuide, storeId, storeName });
      ctx.body = ctx.wrapper({ list: stores });
    } catch (e) {
      ctx.body = ctx.wrapperIot({}, 203, e);
    }
  }

  async createChannel() {
    const { ctx, service } = this;
    const { title } = ctx.request.body;
    // console.log(ctx.request.body, 'ctx.request.body ==== >>>');
    // 添加门店
    try {
      const success = await service.nsl.store.createChannel({ title });
      ctx.body = ctx.wrapper({ success: !!success });
    } catch (e) {
      ctx.body = ctx.wrapperIot({}, 203, e);
    }
  }
}
module.exports = StoreController;
