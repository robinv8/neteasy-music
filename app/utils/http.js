'use strict';

module.exports = app => {
  class CustomHttpClient extends app.HttpClient {
    request(url, opt) {
      return new Promise((resolve, reject) => {
        super.request(url, opt).then(result => {
          if (result.status === 200 && result.data.code === 200) {
            resolve(result.data)
          } else {
            app.logger.error(result.data);
            reject(false);
          }
        }, (err) => {
          app.logger.error(err)
        })
      });
    }

    curl(url, opt) {
      return this.request(url, opt);
    }
  }

  app.HttpClient = CustomHttpClient;
};