'use strict';

const assert = require('http-assert');
module.exports = app => {
  class HttpClient extends app.HttpClient {
    request(url, opt) {
      return new Promise(resolve => {
        assert(/^http/.test(url), 'url should start with http, but got ' + url);
        console.log('sasa');
        resolve();
      }).then(() => {
        return super.request(url, opt);
      });
    }

    curl(url, opt) {
      return this.request(url, opt);
    }
  }

  app.HttpClient = HttpClient;
}