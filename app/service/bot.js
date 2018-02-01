'use strict';

const BaseBot = require('bot-sdk');
const _ = require('lodash');
const NetEasyAuth = require('../service/auth');

class Bot extends BaseBot {
  constructor(postData, ctx) {
    super(postData);
    ///this.musicService = ctx.service.music;
    this.ctx = ctx;
    const NetEasyAuth = ctx.service.auth;
    this.addLaunchHandler(async () => {
      const personInfo = await NetEasyAuth.login('13893332941', 'ryb19930000');
      ctx.logger.info(personInfo);
      ctx.personInfo = personInfo;

      this.waitAnswer();
      return {
        outputSpeech: '欢迎使用设备控制!',
      };
    });
    this.addIntentHandler('palymusic163', async () => {
      const operate = this.getSlot('operate_type');
      console.log(operate);
      const { Play, Stop } = Bot.Directive.AudioPlayer;
      if (operate === 'play') {
        const musics = await this.musicService.getPersonalFM();
        const musicUrls = await _.map(musics.data.data || [], this.ctx.service.music.getMusicUrl);

        console.log(musicUrls);
        const directive = new Play('http://zhangmenshiting.qianqian.com/data2/music/fdc0f7d7a9c20fdfdd4951fa4a661ed8/305637166/305637166.mp3?xcode=1ce034001535c06c3d7cab37c0a62272', 'REPLACE_ALL');
        return Promise.resolve({
          directives: [ directive ],
          outputSpeech: '开始播放',
        });
      } else if (operate === 'pause') {
        const directive = new Stop();
        return Promise.resolve({
          directives: [ directive ],
          outputSpeech: '',
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
}

module.exports = Bot;
