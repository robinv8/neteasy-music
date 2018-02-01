'use strict';
const Service = require('egg').Service;
const Api = require('../../config/api');
const builderurl = require('../utils/builderurl');

class MusicService extends Service {
  //获取私人FM
  getPersonalFM() {
    const { path } = Api.personal_fm;
    const url = builderurl(Api.url + path, {});
    return this.ctx.curl(url, {
      method: 'get',
      dataType: 'json',
    });
  }

  async getMusicUrl(item) {
    const { path, params } = Api.musicUrl;
    params.id = item.id;
    const url = builderurl(Api.url + path, params);
    return this.ctx.curl(url, {
      method: 'get',
      dataType: 'json',
    });
  }
}

module.exports = MusicService;
