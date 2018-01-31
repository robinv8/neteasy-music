'use strict';
const Api = {
      url: 'http://music163.rnode.me/',
      //手机登录
      phoneLogin: {
        path: 'login/cellphone',
        params:
            {
              phone: '',
              password: ''
            }
      },
      //私人FM
      personal_fm: {
        path: 'personal_fm'
      },
      //获取音乐url
      musicUrl: {
        path: 'music/url',
        params: {
          id: ''
        }
      }
    }
;

module.exports = Api;