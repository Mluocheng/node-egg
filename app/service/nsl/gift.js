'use strict';

const Service = require('egg').Service;

class GiftServer extends Service {

  // 获取赠品列表
  async getGiftList({ pageSize = 10, pageNo = 1 }) {
    const offset = pageSize * (pageNo - 1);
    const limit = parseInt(pageSize.toString());
    const where = { // 搜索 post 表
      where: 1, // WHERE 条件
      columns: [ 'giftBarcode', 'top', 'isNeedCheck', 'isSelfBuy', 'giftId', 'giftName', 'giftUrl', 'giftCode', 'giftPrice', 'giftQuantity', 'giftProvided', 'createdAt' ], // 要查询的表字段
      orders: [[ 'giftId', 'desc' ]], // 排序方式
      limit, // 返回数据量
      offset, // 数据偏移量
    };
    const total = await this.app.mysql.query('SELECT COUNT( * ) as total FROM nsl.gift');
    // console.log(total[0].total, 'count ===============');
    const gifts = await this.app.mysql.select('gift', where);
    return { gifts, total: total[0].total };
  }
  // 添加赠品
  async postAddGift(params) {
    return await this.app.mysql.insert('gift', { ...params });
  }
  // 渠道列表
  async getChannelList() {
    return await this.app.mysql.select('channel');
  }

  async getGiftDetail(giftId, options = null) {
    const row = {
      where: {
        giftId,
      },
      columns: [ 'giftBarcode', 'top', 'isNeedCheck', 'isSelfBuy', 'giftId', 'giftName', 'giftUrl', 'giftCode', 'giftPrice', 'giftQuantity', 'giftProvided', 'createdAt' ],
      ...options,
    };
    return this.app.mysql.select('gift', row);
  }

}
module.exports = GiftServer;
