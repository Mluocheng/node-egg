/* eslint-disable no-return-assign */
'use strict';

const Controller = require('egg').Controller;

class RelationController extends Controller {
  // 添加门店和赠品的关系表
  async addGiftToStore() {
    const { ctx, service } = this;
    const { sendStoreObjectArray, giftId } = ctx.request.body;
    // console.log(sendStoreObjectArray, 'sendStoreObjectArray ============');
    if (!giftId || !sendStoreObjectArray.length) {
      return ctx.body = ctx.error({
        msg: '缺少必要参数',
      });
    }
    // 判断当前添加的赠品数量是否 小于 剩余 量
    const gift = await service.nsl.gift.getGiftDetail(giftId);
    console.log(gift, 'gift =========== >>>');
    if (!gift) {
      ctx.body = ctx.error({ code: 10002, msg: '赠品 不存在，请创建后重试' });
      return;
    }
    const giftProvided = sendStoreObjectArray.map(i => i.putStoreNumber).reduce((total, number) => total + number);
    if (gift.giftQuantity - giftProvided - gift.giftProvided < 0) {
      ctx.body = ctx.error({ code: 30001, msg: '该赠品 剩余数量不足, 请补货后重试' });
      return;
    }
    const addRelationPromise = [];
    for (let i = 0; i < sendStoreObjectArray.length; i++) {
      const { storeId, putStoreNumber, expressNumber } = sendStoreObjectArray[i];
      addRelationPromise.push(service.nsl.relation.addRelation({
        giftId,
        putStoreNumber,
        expressNumber,
        storeId,
      }));
    }
    try {
      // 添加赠品到记录表
      await Promise.all(addRelationPromise);
      ctx.body = ctx.wrapper({ success: true });
    } catch (e) {
      ctx.body = ctx.error({ code: 30002, msg: '添加赠品失败 请稍后重试' });
    }
  }

}
module.exports = RelationController;
