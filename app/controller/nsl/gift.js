'use strict';

const Controller = require('egg').Controller;

class GiftController extends Controller {
  async getGiftList() {
    const { ctx } = this;
    const { pageSize, pageNo } = ctx.query;
    // 获取门店列表
    try {
      const { gifts, total } = await this.ctx.service.nsl.gift.getGiftList({ pageSize, pageNo });
      ctx.body = ctx.wrapper({
        list: gifts,
        total,
        params: { pageSize: 'number', pageNo: 'number', keyword: 'string' },
        msg: '入参, 带*为必填pageSize默认为10，pageNo为 1 keyword为空',
      });
    } catch (e) {
      ctx.body = ctx.wrapperIot({}, 203, e);
    }
  }

  // 添加赠品
  async postAddGift() {
    const { ctx, service } = this;
    const { giftName, giftUrl, giftQuantity, giftCode, giftPrice, isNeedCheck, giftBarcode, isSelfBuy } = ctx.request.body;
    console.log(ctx.request.body, 'ctx.request.body ==== >>>');
    try {
      const gift = await service.nsl.gift.postAddGift({ giftName, giftUrl, giftQuantity, giftCode, giftPrice, isNeedCheck, giftBarcode, isSelfBuy });
      ctx.body = ctx.wrapper({ gift });
    } catch (e) {
      ctx.body = ctx.wrapperIot({}, 203, e);
    }
  }

  // 获取渠道列表
  async getChannelList() {
    const { ctx, service } = this;
    const list = await service.nsl.gift.getChannelList();
    ctx.body = ctx.wrapper({ list });
  }
}
module.exports = GiftController;
