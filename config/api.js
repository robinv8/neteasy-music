'use strict';
const Api = {
      url: 'http://music163.rnode.me/',
      phoneLogin: {
        path: 'login/cellphone',
        params:
            {
              phone: '',
              password: ''
            }
      },
      personal_fm: {
        path: 'personal_fm'
      },
      //获取音乐url
      musicUrl: {
        path: 'music/url',
        params: {
          id: ''
        }
      },
      userPlaylist: {
        path: 'user/playlist',
        params: {
          uid: ''
        }
      }
    }
;

module.exports = Api;