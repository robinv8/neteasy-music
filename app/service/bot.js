'use strict';
const Service = require('egg').Service;
const BaseBot = require('bot-sdk');
const _ = require('lodash');
const urlQueue = require('../utils/urlqueue');

class Bot extends BaseBot {
  constructor(postData, ctx) {
    super(postData);
    this.ctx = ctx;
    this.addLaunchHandler(() => this.launchHander());
    this.addIntentHandler('palymusic163', async () => {
      const operate = this.getSlot('operate_type');
      const { Play, Stop } = Bot.Directive.AudioPlayer;
      try {
        if (operate === 'play') {
          this.userPlayList();
          //const directive = new Play(urlQueue.getUrl().data[ 0 ].url, 'REPLACE_ALL');
          return Promise.resolve({
            directives: [],
            outputSpeech: '开始播放',
          });
        } else if (operate === 'pause') {
          const directive = new Stop();
          return Promise.resolve({
            directives: [ directive ],
            outputSpeech: '',
          });
        } else if (operate === 'next' || operate === 'prev') {
          const directive = new Play(urlQueue.getUrl(operate).data[ 0 ].url, 'REPLACE_ALL');
          return Promise.resolve({
            directives: [ directive ],
            outputSpeech: '开始播放',
          });
        }
      } catch (e) {
        this.ctx.logger.error(e);
        return Promise.resolve({
          outputSpeech: '音乐加载异常',
        });
      }

    });
    this.addSessionEndedHandler(() => {
      this.endSession();
      return {
        outputSpeech: '谢谢使用设备控制！',
      };
    });
  }

  async launchHander() {
    const NetEasyAuth = this.ctx.service.auth;
    this.ctx.session.personInfo = await NetEasyAuth.login('13893332941', 'ryb19930000');
    this.waitAnswer();
    return {
      outputSpeech: '欢迎使用网易云音乐!',
    };
  }

  buildMusicQueue(item) {
    const { Play } = Bot.Directive.AudioPlayer;
    return new Play(item.data[ 0 ].url, 'ENQUEUE');
  }

  async fm() {
    try {
      const musics = await this.ctx.service.music.getPersonalFM();
      const musicUrls = await Promise.all(_.map(musics.data || [], async json => await this.ctx.service.music.getMusicUrl(json)));
      urlQueue.setUrl(musicUrls);
    } catch (err) {
      this.ctx.logger.error(err);
    }
  }

  async userPlayList() {
    try {
      const personInfo =  this.ctx.session.personInfo;
      const playList = await this.ctx.service.music.getUserPlaylist(JSON.parse(personInfo))
    } catch (e) {

    }
  }

  urlQueue() {

  }
}

module.exports = Bot;
