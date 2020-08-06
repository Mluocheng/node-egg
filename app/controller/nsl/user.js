'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  async getUser() {
    // 根据id查询用户信息
    const users = await this.ctx.service.nsl.user.getUser();
    this.ctx.body = users;
  }
}
module.exports = UsersController;
