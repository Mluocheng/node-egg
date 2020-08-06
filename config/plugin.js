'use strict';

/** @type Egg.EggPlugin */

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
// 跨域配置
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
