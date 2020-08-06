'use strict';

const Service = require('egg').Service;

class RelationServer extends Service {

  async addRelation({ giftId, putStoreNumber, expressNumber, storeId }) {
    return await this.app.mysql.insert('giftrelationship', { giftId, putStoreNumber, expressNumber, storeId });
  }

}
module.exports = RelationServer;
