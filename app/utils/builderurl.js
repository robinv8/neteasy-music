'use strict';

function http_builder_url(url, data) {
  if (typeof(url) == 'undefined' || url == null || url == '') {
    return '';
  }
  if (typeof(data) == 'undefined' || data == null || typeof(data) != 'object') {
    return '';
  }
  url += (url.indexOf("?") != -1) ? "" : "?";
  for (var k in data) {
    url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[ k ]);
  }
  return url;
}

module.exports = http_builder_url;
