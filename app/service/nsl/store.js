'use strict';

const Service = require('egg').Service;

class StoreServer extends Service {
  async getStores({ pageSize = 10, pageNo = 1 }) {
    // 获取门店列表
    const offset = pageSize * (pageNo - 1);
    const limit = parseInt(pageSize.toString());

    const where = { // 搜索 post 表
      where: 1, // WHERE 条件
      columns: [ 'storeName', 'storeGuide', 'storeAddress', 'storeBuys', 'storeId', 'guiderName' ], // 要查询的表字段
      orders: [[ 'storeId', 'desc' ]], // 排序方式
      limit, // 返回数据量
      offset, // 数据偏移量
    };
    const total = await this.app.mysql.query('SELECT COUNT( * ) as total FROM nsl.store');
    // console.log(total[0].total, 'count ===============');
    const stores = await this.app.mysql.select('store', where);
    return { stores, total: total[0].total };
  }

  // 添加门店
  async postAddStore(params) {
    return await this.app.mysql.insert('store', { ...params });
  }
  // 创建渠道
  async createChannel({ title }) {
    return await this.app.mysql.insert('channel', { title });
  }
}
module.exports = StoreServer;
