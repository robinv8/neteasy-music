'use strict';
const Controller = require('egg').Controller;
const Bot = require('../service/bot');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async play() {
    const { ctx } = this;
    const { request } = ctx;
    const b = new Bot(JSON.parse(request.rawBody));
    // 开启签名认证
    // 为了避免你的服务被非法请求，建议你验证请求是否来自于DuerOS
    b.initCertificate(request.headers, request.rawBody).enableVerifyRequestSign();

    // 不需要监控
    // b.run() 返回一个Promise的实例
    b.run().then(result => {
      ctx.body = result;
      console.log(result);
    });
  }
}

module.exports = HomeController;