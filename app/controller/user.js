'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async getUserById() {
    // 根据id查询用户信息
    const users = await this.ctx.service.user.getUserById(2);
    this.ctx.body = users;
  }
}
module.exports = UserController;
