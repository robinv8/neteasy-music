'use strict';
const _ = require('lodash');
let urlList = [];

function deleteUrl() {
  _.remove(urlList, (n, index) => {
    return urlList.length - 1 === index;
  })
}

module.exports = {
  getUrl: () => {
    const urlObj = _.cloneDeep(_.last(urlList));
    deleteUrl();
    return urlObj;
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