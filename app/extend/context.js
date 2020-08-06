/* eslint-disable eqeqeq */
'use strict';
/**
 * Created by Administrator on 2017/11/10.
 */
const md5 = require('md5');


module.exports = {

  wrapper(data = {}, code = 0, msg = 'ok', notice = '') {
    return {
      code,
      msg,
      notice,
      data,
    };
  },

  error({ code, msg, notice }) {
    return this.wrapper({}, code, msg, notice);
  },

  makeNumId() {
    const random = Math.floor(Math.random() * 500 + 500);
    return `${random}${new Date().getTime()}`;
  },

  sliceArray(array, size = 20) {
    const result = [];
    const count = Math.ceil(array.length / size);
    for (let x = 0; x < count; x++) {
      const start = x * size;
      const end = start + size;
      result.push(array.slice(start, end));
    }
    return result;
  },
  getNowFormatDate() {
    const date = new Date();
    const seperator1 = '-';
    const seperator2 = ':';
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate;
    }
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    second = second < 10 ? '0' + second : second;

    const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + ' ' + hour + seperator2 + minutes
      + seperator2 + second;
    return currentdate;
  },

  makeId() {
    const minRandom = Math.floor(Math.random() * (800 - 1 + 1) + 800);
    const random = Math.floor(Math.random() * (100000 - minRandom + 1) + 100000);
    return md5(md5(new Date().getTime() + md5(random)));
  },

  convert(rows) {
    function exists(rows, parentId) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].cid == parentId) return true;
      }
      return false;
    }

    const nodes = [];
    // get the top level nodes
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!exists(rows, row.parentId)) {
        nodes.push({
          cid: row.cid,
          name: row.name,
          pic: row.pic,
          goods: row.goods,
        });
      }
    }

    const toDo = [];
    for (let i = 0; i < nodes.length; i++) {
      toDo.push(nodes[i]);
    }
    while (toDo.length) {
      const node = toDo.shift();
      // get the children nodes
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.parentId == node.cid) {
          const child = { cid: row.cid, name: row.name, pic: row.pic, goods: row.goods };
          if (node.children) {
            node.children.push(child);
          } else {
            node.children = [ child ];
          }
          toDo.push(child);
        }
      }
    }
    return nodes;
  },

  convertSkin(rows) {
    function exists(rows, parentId) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].cid == parentId) return true;
      }
      return false;
    }

    const nodes = [];
    // get the top level nodes
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!exists(rows, row.parentId)) {
        nodes.push({
          cid: row.cid,
          name: row.name,
          pic: row.pic,
          items: row.items,
        });
      }
    }

    const toDo = [];
    for (let i = 0; i < nodes.length; i++) {
      toDo.push(nodes[i]);
    }
    while (toDo.length) {
      const node = toDo.shift();
      // get the children nodes
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.parentId == node.cid) {
          const child = { cid: row.cid, name: row.name, pic: row.pic, items: row.items };
          if (node.children) {
            node.children.push(child);
          } else {
            node.children = [ child ];
          }
          toDo.push(child);
        }
      }
    }
    return nodes;
  },

  wrapperIot(data = {}, code = 200, message = 'success') {
    return {
      code,
      message,
      ...data,
    };
  },

};
