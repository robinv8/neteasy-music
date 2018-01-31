'use strict';
const Service = require('egg').Service;

const Api = require('../../config/api');
const builderurl = require('../utils/builderurl');

class NetEasyAuth extends Service {
  login(username, password) {
    const { path, params } = Api.phoneLogin;
    params.phone = username;
    params.password = password;
    const url = builderurl(Api.url + path, params);
    return this.ctx.curl(url, {
      method: 'get',
      dataType: 'json',
    })
  }
}

module.exports = NetEasyAuth;