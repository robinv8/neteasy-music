'use strict';
const _ = require('lodash');

let urlList = [],
    flag = 0;

module.exports = {
  /**
   * 获取音乐
   * @param type 参数值 next、prev
   * @returns {*}
   */
  getUrl: (type = 'next') => {
    return urlList[ type === 'next' ? ++flag : --flag ];
  },
  setUrl: (urlArray) => {
    urlList = _.concat(urlArray, urlList)
  },

  replace: () => {

  },
  getAll() {
    return urlList
  }

}