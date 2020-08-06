'use strict';

const Service = require('egg').Service;

class UserServer extends Service {
  async getUser() {
    // 根据id查询用户信息
    return await this.app.mysql.select('user');
  }
}
module.exports = UserServer;
