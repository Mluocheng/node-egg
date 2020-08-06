// eslint-disable-next-line strict
const { Service } = require('egg');

class BaseService extends Service {

  constructor(ctx, model) {
    super(ctx);
    this.mod = model;
  }

  findAll(row) {
    return this.mod.findAll(row);
  }

  findAndCountAll(row) {
    return this.mod.findAndCountAll(row);
  }

  // eslint-disable-next-line jsdoc/require-param
  /** ****************稳定的方法**************** **/
  create(params, options) {
    return this.mod.create(params, options);
  }

  update({ params, row }) {
    return this.mod.update(params, row);

  }

  deleteAll(row) {
    return this.mod.destroy(row);
  }

  delete(row) {
    return this.mod.destroy(row);
  }

  findOne(row) {
    return this.mod.findOne(row);
  }

  async updateOrCreate({ params, where }) {
    const row = { where };
    const isExist = await this.findOne(row).then(d => !!d);
    return isExist ? this.update({ params, row }) : this.create({ ...params, ...where });
  }

}

module.exports = BaseService;
